# github-trending-api

## Description / 描述

A simple API that returns the number of Github trending repositories.

一个简单的 API，用于返回 GitHub 趋势仓库的数量。

## Project setup / 项目设置

```bash
$ pnpm install
```

## Compile and run the project / 编译并运行项目

```bash
# development / 开发模式
$ pnpm run start

# watch mode / 监听模式
$ pnpm run start:dev

# production mode / 生产模式
$ pnpm run start:prod
```

## Usage / 用法

### API Endpoint / API 端点

- **GET** `/trending`

Returns a list of trending repositories on GitHub.

返回 GitHub 上趋势仓库的列表。

### Example Response / 示例响应

```json
[
      {
        "author": "author_name",
        "name": "repository_name",
        "url": "https://github.com/author_name/repository_name",
        "description": "Repository description",
        "language": "Programming Language",
        "languageColor": "#colorCode",
        "stars": number,
        "forks": number,
        "builtBy": [
          {
            "username": "user_name",
            "href": "https://github.com/user_name",
            "avatar": "https://avatar.url"
          }
        ],
        "currentPeriodStars": number
      },
      ...
    ]
```

## 贡献 / Contributing

欢迎任何形式的贡献！请提交问题或拉取请求。/ Contributions are welcome! Please submit issues or pull requests.

## 许可证 / License

MIT 许可证。请查看 [LICENSE](LICENSE) 文件以获取更多信息。/ MIT License. Please see the [LICENSE](LICENSE) file for more information.
## 联系 / Contact

如有问题，欢迎通过 [GitHub Issues](https://github.com/louyongjiu/github-trending-api/issues) 联系我。/ If you have any questions, feel free to reach out via [GitHub Issues](https://github.com/louyongjiu/github-trending-api/issues).