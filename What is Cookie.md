# A Not-So-Small Problem

Suppose the server has an interface that, when requested, can add an administrator.

However, not everyone has the authority to perform such operations.

So how does the server know if the person requesting the interface has permission?

The answer is: only logged-in administrators can perform such operations.

But the problem is, the transmission between client and server uses the HTTP protocol, which is stateless. What does stateless mean? It means **the server doesn't know if the person making this request is the same person who successfully logged in earlier**.

![](http://mdrs.yuanjin.tech/img/image-20200417161014030.png)

![](http://mdrs.yuanjin.tech/img/image-20200417161244373.png)

Due to the stateless nature of the HTTP protocol, the server **forgets** all previous requests. It cannot determine whether this current request's client is the same client that successfully logged in before.

> You can imagine the server as someone with severe face blindness who has no way to distinguish between people or remember what they've done before

So, the server came up with a solution.

It follows the process below to authenticate the client's identity:

1. After the client successfully logs in, the server gives the client an access pass (token)
2. For all subsequent client requests, this access pass (token) must be attached

![](http://mdrs.yuanjin.tech/img/image-20200417161950450.png)

The server upholds the fine tradition of "recognizing the pass, not the person," making it easy to identify identities.

However, users can't possibly only log in to one website, so clients will receive access passes from various websites. Therefore, the client needs something like a card wallet that can provide the following functions:

1. **Ability to store multiple access passes**. These passes come from different websites, and it's possible for one website to have multiple passes for accessing different areas
2. **Ability to automatically present access passes**. When the client visits different websites, it can automatically attach the corresponding access pass to the request and send it out
3. **Present the correct access pass**. The client cannot send KFC's access pass to McDonald's
4. **Manage the validity period of access passes**. The client must be able to automatically discover expired passes and remove them from the wallet

What can satisfy all the above requirements is cookies.

Cookies are like a card wallet, specifically designed to store various access passes, with a mechanism to automatically manage these credentials.

Each card in the wallet is called **a cookie**.

# Cookie Composition

Cookie is a concept unique to browsers, like the browser's exclusive card wallet, managing identity information for various websites.

Each cookie is equivalent to a card belonging to a certain website, recording the following information:

- key: The key, such as "identity number"
- value: The value, such as Yuan Xiaojin's identity number "14563D1550F2F76D69ECBF4DD54ABC95", which is somewhat like a barcode on a card, though it can be any information
- domain: The domain, indicating which website this cookie belongs to, such as `yuanjin.tech`, meaning this cookie belongs to the `yuanjin.tech` website
- path: The path, indicating which base path of the website this cookie belongs to, just like different departments of the same company issuing different access passes. For example, `/news` means this cookie belongs to the `/news` path (detailed explanation follows)
- secure: Whether to use secure transmission (detailed explanation follows)
- expire: Expiration time, indicating when this cookie expires

When the browser sends a request to the server, it glances at its own card wallet to see which cards are suitable to attach and send to the server.

If a cookie **simultaneously satisfies** the following conditions, this cookie will be attached to the request:

- The cookie has not expired
- The domain in the cookie matches the domain of this request
  - For example, if the cookie's domain is `yuanjin.tech`, it can match request domains like `yuanjin.tech`, `www.yuanjin.tech`, `blogs.yuanjin.tech`, etc.
  - For example, if the cookie's domain is `www.yuanjin.tech`, it can only match the request domain `www.yuanjin.tech`
  - Cookies don't care about ports, as long as the domain matches
- The path in the cookie matches the path of this request
  - For example, if the cookie's path is `/news`, it can match request paths like `/news`, `/news/detail`, `/news/a/b/c`, etc., but cannot match `/blogs`
  - If the cookie's path is `/`, you can imagine it can match all paths
- Verify cookie's secure transmission
  - If the cookie's secure attribute is true, the request protocol must be `https`, otherwise this cookie won't be sent
  - If the cookie's secure attribute is false, the request protocol can be `http` or `https`

If a cookie satisfies all the above conditions, the browser will automatically add it to this request.

The specific way of adding is that **the browser will automatically place qualifying cookies in the request headers**. For example, when I visit Baidu in the browser, it attaches the following cookies in the request headers:

![](http://mdrs.yuanjin.tech/img/image-20200417170328584.png)

See the blurred parts? This part is sent to the server through the request header `cookie`, formatted as `key=value; key=value; key=value; ...`, where each key-value pair is a qualifying cookie.

**Cookies contain important identity information, never leak your cookies to others!!!** Otherwise, others will get your credentials, and with credentials comes the possibility of doing whatever they want.

# How to Set Cookies

Since cookies are stored on the browser side, and many credentials are issued by servers,

cookie setting has two modes:

- Server response: This mode is very common. When the server decides to issue a credential to the client, it includes the cookie in the response message, and the browser automatically saves the cookie to the wallet
- Client self-setting: This mode is less common, but can happen. For example, when a user closes an advertisement and selects "don't show again," this small piece of information can be directly saved to cookies through the browser's JS code. When subsequently requesting the server, the server will see the client's cookie indicating they don't want to see ads again, so it won't send ads anymore

## Server-side Cookie Setting

The server can tell the browser how to set cookies by setting response headers.

Response headers are set in the following format:

```yaml
set-cookie: cookie1
set-cookie: cookie2
set-cookie: cookie3
...
```

Through this mode, multiple cookies can be set in one response. How many cookies to set and what cookies to set depends on your needs.

Each cookie is formatted as follows:

```
key=value; path=?; domain=?; expire=?; max-age=?; secure; httponly
```

For each cookie, only the key-value pair must be set, all other attributes are optional, and order doesn't matter.

When such response headers reach the client, **the browser automatically saves the cookies to the wallet. If a completely identical card already exists in the wallet (same key, path, domain), it will automatically overwrite the previous settings**.

Below, each attribute value is explained in sequence:

- **path**: Sets the cookie's path. If not set, the browser automatically sets it to the current request's path. For example, if the browser requests the address `/login` and the server responds with `set-cookie: a=1`, the browser will set this cookie's path to the request path `/login`
- **domain**: Sets the cookie's domain. If not set, the browser automatically sets it to the current request domain. For example, if the browser requests the address `http://www.yuanjin.tech` and the server responds with `set-cookie: a=1`, the browser will set this cookie's domain to the request domain `www.yuanjin.tech`
  - It's worth noting that if the server responds with an invalid domain, the browser won't recognize it
  - What is an invalid domain? It's when the response domain doesn't even have the same root domain. For example, if the browser requests the domain `yuanjin.tech` and the server responds with cookie `set-cookie: a=1; domain=baidu.com`, the browser won't recognize such a domain
  - If browsers allowed even this situation, it would mean Zhang San's server has the right to give users a cookie for accessing Li Si's server, which would cause many security issues
- **expire**: Sets the cookie's expiration time. This must be a valid GMT time, i.e., Greenwich Mean Time string, such as `Fri, 17 Apr 2020 09:35:59 GMT`, representing Greenwich time `2020-04-17 09:35:59`, which is Beijing time `2020-04-17 17:35:59`. When the client's time reaches this point, it will automatically destroy the cookie
- **max-age**: Sets the cookie's relative validity period. Usually only one of expire and max-age needs to be set. For example, setting `max-age` to `1000` means the browser will automatically set its `expire` to the current time plus 1000 seconds as the expiration time when adding the cookie
  - If expire is not set and max-age is not set, it means it expires after the session ends
  - For most browsers, closing all browser windows means the session ends
- **secure**: Sets whether the cookie is for secure connections. If this value is set, it means this cookie can only be sent with `https` requests subsequently. If not set, it means this cookie will be sent with all requests
- **httponly**: Sets whether the cookie can only be used for transmission. If this value is set, it means this cookie can only be used for transmission and cannot be accessed on the client side through JS, which is very useful for preventing Cross-Site Scripting (XSS) attacks
  - How to access through JS will be explained later
  - What XSS is, is not within the scope of this article

Here's an example: the client makes a `post` request to the server `http://yuanjin.tech/login` and provides account and password in the message body. After the server verifies successful login, it adds the following content to the response headers:

```
set-cookie: token=123456; path=/; max-age=3600; httponly
```

When this response reaches the browser, the browser will create the following cookie:

```yaml
key: token
value: 123456
domain: yuanjin.tech
path: /
expire: 2020-04-17 18:55:00 #assuming current time is 2020-04-17 17:55:00
secure: false  #any request can attach this cookie, as long as other requirements are met
httponly: true #JS is not allowed to access this cookie
```

Thus, with the browser's subsequent requests to the server, as long as requirements are met, this cookie will be attached to the request headers and sent to the server:

```yaml
cookie: token=123456; other cookies...
```

Now, there's one last question: how to delete a cookie in the browser?

To delete a browser cookie, just make the server respond with a cookie that has the same domain, same path, same key, but is expired.

**So, deleting a cookie is actually modifying a cookie**

The following response will make the browser delete `token`:

```yaml
cookie: token=; domain=yuanjin.tech; path=/; max-age=-1
```

After the browser modifies the cookie as required, it will find that the cookie has expired, so it will naturally delete it.

> Whether modifying or deleting, pay attention to the cookie's domain and path, because it's entirely possible to have cookies with different domains or paths but the same key
>
> Therefore, you cannot determine which cookie it is based solely on the key

## Client-side Cookie Setting

Since cookies are stored on the browser side, the browser exposes an interface to JS, allowing it to set cookies:

```js
document.cookie = "key=value; path=?; domain=?; expire=?; max-age=?; secure";
```

As you can see, setting cookies on the client side has the same format as server-side cookie setting, with the following differences:

- No httponly. Because httponly is meant to restrict client-side access, since you're configuring on the client side, it naturally loses its restrictive meaning
- Default value of path. When setting cookies on the server side, if path is not written, the request's path is used. When setting cookies on the client side, there might not be a request at all. Therefore, the default value of path when set on the client side is the current webpage's path
- Default value of domain. Same as path, the default value when set on the client side is the current webpage's domain
- Others: Same
- Deleting cookies: Same as server side, modify the cookie's expiration time

# Summary

Above is the content about cookie principles.

If used in login scenarios, the flow is as follows:

**Login Request**

1. Browser sends request to server with account and password
2. Server verifies whether account and password are correct. If incorrect, responds with error. If correct, sets cookie in response headers with login authentication information (what the login authentication information looks like, how to design it, what issues to consider, is another topic - you can search for jwt)
3. Client receives cookie, browser automatically records it

**Subsequent Requests**

1. Browser sends request to server, hoping to add an administrator, and automatically attaches cookie to the request
2. Server first gets the cookie, verifies whether the information in the cookie is correct. If incorrect, doesn't perform the operation. If correct, completes the normal business process


