# Moneyger (β-0.0.1)
家計簿的なカンジで気軽にお金の出入りを記録できるWebAppです。<br>
MobileUIのみ対応なのでPC,Tabletでの仕様を想定したUIは次バーションで実装予定です。<br>
[moneyger.kawaii-music.xyz](https://moneyger.kawaii-music.xyz/)にdevelopブランチのアプリをホスティングしています。

- PWA対応

## usage
`node build.js` を実行すると `backend/dist` 直下に以下のようなファイル群が生成されます。
```
dist/
  ├Public/
  │    ├assets/
  │    │    ├*.js
  │    │    └*.css
  │    ├icon-*.png
  │    ├ss.png
  │    ├manifest.json
  │    ├sw.js
  │    └index.html
  └index.js
```
問題なくビルドが終了すれば`http://localhost:8000`で起動します。

デーモン化する場合は下の例のようにするなどしてください。<br>
`// {service_name}.service`
```
[Unit]
Description={service_name}

[Service]
Type=simple
WorkingDirectory={dir_path}
ExecStart=node build.js

[Install]
WantedBy=multi-user.target
```

## License
Copyright (c) 2024 Suki9 - kawaii-music.xyz

http://kawaii-music.xyz

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the 
"Software"), to deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, merge, publish, 
distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to 
the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

＊ようやく<br>
好きに使って構いません(但し、Copyrightとライセンスを何処かに乗せること)<br>
また、損害については責任取りません。
