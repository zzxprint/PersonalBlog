export default `
<h3>尝试用Nginx反向代理解决同时部署多个项目的问题</h3>
<p>    这个问题源于我想在服务器上部署博客的前端项目，打算用Nginx来部署前端服务，但是我的443端口已经提供给了微信小程序的服务。</p>
<p>    微信小程序要求正式环境的请求必须采用域名，并且是https服务，肯定是无法修改的，博客的前端项目虽然可以用80端口，但是浏览器会一直提示“不安全”，看起来也很不好。</p>
<h5>1. 尝试给Nginx配置证书以及启用443端口</h5>
<p>    我的CA证书已经被我放在了和小程序服务在一起的<code>/home</code>路径下，找到<code>/etc/nginx/nginx.conf</code>文件，根据它的提示添加如下修改配置文件</p>
<pre><code># Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate &quot;/etc/pki/nginx/server.crt&quot;;
#        ssl_certificate_key &quot;/etc/pki/nginx/private/server.key&quot;;
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers PROFILE=SYSTEM;
#        ssl_prefer_server_ciphers on;
#       ...以下省略
#    }
</code></pre>
<p>这里我为了先验证配置是否生效，已经停止了node服务，使用 <code>nginx -s reload</code> 重新载入配置文件，打开浏览器验证，成功访问到服务。</p>
<p>这时候启动node服务，不出意外的因为443端口被占用而出错。</p>
<h5>2. Nginx的反向代理</h5>
<p>    虽然公司的前端项目基本都使用反向代理，但是自己还是第一次尝试，上网搜了一下资料，竟然很简单，不过要注意的是 <code>location</code> 的配置是真的很绕。</p>
<p>    我这里首先将node服务的端口更改为7001并重新启动，用域名+端口访问成功。继续修改 <code>/etc/nginx/nginx.conf</code> 文件，在 原有的<code>location</code> 下新增一条</p>
<pre><code>location ^~/miniprogram/ {
  proxy_pass    http://47.114.2.104:7001/;
}
</code></pre>
<p>使用 <code>nginx -s reload</code> 重新载入配置文件，打开浏览器输入 <code>域名/miniprogram</code> 成功访问到小程序服务，接下来只需要统一修改小程序的请求前缀为 <code>/miniprogram</code> 就可以了，而博客项目，仍然可以通过域名直接访问。</p>
<h5>3. 拓展知识：Nginx反向代理配置</h5>
<p>    在自己尝试配置反向代理后发现了 <code>location</code> 之后加不加 <code>/</code> 以及代理地址后加不加 <code>/</code> 会造成最后转发的结果天差地别，所以整理一下方便自己以后查阅。</p>
<p>假设：Nginx服务器地址为 <code>1.1.1.1</code> ，需要转发到 <code>2.2.2.2</code> </p>
<p>发送请求： <code>1.1.1.1/foo/api</code></p>
<figure><table>
<thead>
<tr><th>location</th><th>proxy_pass</th><th>结果</th></tr></thead>
<tbody><tr><td>/foo</td><td><a href='http://2.2.2.2' target='_blank' class='url'>http://2.2.2.2</a></td><td>/foo/api</td></tr><tr><td>/foo</td><td><a href='http://2.2.2.2/' target='_blank' class='url'>http://2.2.2.2/</a></td><td>//api</td></tr><tr><td>/foo/</td><td><a href='http://2.2.2.2' target='_blank' class='url'>http://2.2.2.2</a></td><td>/foo/api</td></tr><tr><td>/foo/</td><td><a href='http://2.2.2.2/' target='_blank' class='url'>http://2.2.2.2/</a></td><td>/api</td></tr></tbody>
</table></figure>
<p>假设：Nginx服务器地址为 <code>1.1.1.1</code> ，需要转发到 <code>2.2.2.2</code> </p>
<p>发送请求： <code>1.1.1.1/foo/api</code></p>
<figure><table>
<thead>
<tr><th>location</th><th>proxy_pass</th><th>结果</th></tr></thead>
<tbody><tr><td>/foo</td><td><a href='http://2.2.2.2/bar' target='_blank' class='url'>http://2.2.2.2/bar</a></td><td>/bar/api</td></tr><tr><td>/foo</td><td><a href='http://2.2.2.2/bar/' target='_blank' class='url'>http://2.2.2.2/bar/</a></td><td>/bar//api</td></tr><tr><td>/foo/</td><td><a href='http://2.2.2.2/bar' target='_blank' class='url'>http://2.2.2.2/bar</a></td><td>/barapi</td></tr><tr><td>/foo/</td><td><a href='http://2.2.2.2/bar/' target='_blank' class='url'>http://2.2.2.2/bar/</a></td><td>/bar/api</td></tr></tbody>
</table></figure>
<p>这里的表格一开始真的也是看的我一头雾水，但是看了别人的分析后觉得豁然开朗。</p>
<ol>
<li>首先把关注点放在 <code>proxy_pass</code> 上，观察 <code>ip:port</code> 后有没有接字符串, <code>/</code> 也属于字符串。</li>
<li>如果 <code>ip:port</code> 后有字符串，则找到请求路径，也就是 <code>1.1.1.1/foo/api</code> ，删除 <code>location</code> 的部分。</li>
<li>例如 <code>location</code>为 <code>/foo</code>，则删除完还剩 <code>/api</code>， 如果<code>location</code>为 <code>/foo/</code>，则删除完还剩 <code>api</code>。</li>
<li>将剩下的部分拼接到 <code>proxy_pass</code> 之后，就是最后的结果。</li>

</ol>
`
