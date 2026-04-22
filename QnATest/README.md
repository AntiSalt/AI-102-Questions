# 🎓 AI-102 问答系统

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.6+](https://img.shields.io/badge/Python-3.6+-blue.svg)](https://www.python.org/downloads/)
[![Last Updated](https://img.shields.io/badge/Updated-2026.04-brightgreen.svg)](#更新日志)

一个功能完整的Web问答学习系统，包含290道Azure AI-102认证考试题库。本系统采用现代化UI设计，支持单选/多选题、进度保存、错题回顾等功能。

👉 📚 **[文档导航](docs/00-START-HERE.md)** | [快速开始](#快速开始) | [功能列表](#功能特性) | [贡献指南](#贡献)

---

## ✨ 功能特性

### 📊 智能问答系统
- ✅ **290道完整题库** - Azure AI-102 认证考试真题
- ✅ **单选/多选支持** - 智能检测题目类型，选择逻辑自适应
- ✅ **即时反馈** - 提交答案后立即显示结果、解析、争议说明
- ✅ **答案排序无关** - 多选题答案无需按顺序，任意顺序皆判正确
- ✅ **详细解析** - 每道题都有深度解析和考点说明

### 💾 进度管理
- 📱 **自动保存进度** - LocalStorage 浏览器本地存储，关闭浏览器也不丢失
- 🔄 **页面刷新恢复** - 刷新页面后自动恢复到上次的位置和答案
- 📈 **实时统计** - 显示总题数、已答题、正确率、错误统计
- 🔍 **题号快速导航** - 输入题号快速跳转到任意题目

### 🎯 错题管理
- ❌ **错题集合** - 自动统计错过的题目
- 📋 **错题回顾** - 详细显示错题号、你的答案、正确答案
- 🔗 **一键重做** - 点击错题直接跳转到该题，方便重新作答
- 📊 **错题分析** - 错误数、正确率等详细数据

### 🎨 用户体验
- 📱 **完全响应式** - 完美适配手机、平板、桌面各种屏幕
- 🌙 **现代化UI** - 清爽的设计，舒适的配色方案
- ⚡ **高性能** - 纯前端应用，无服务器交互，快速响应
- ♿ **可访问性** - 良好的键盘支持，屏幕阅读器友好

---

## 🚀 快速开始

### 系统要求
- Python 3.6 或更高版本
- 现代浏览器（Chrome、Firefox、Safari、Edge 等）
- 无需网络连接（完全离线运行）

### 方式1️⃣：使用Python启动脚本（推荐）⭐

**最简单的启动方式，一行命令搞定：**

```bash
# 进入项目目录
cd QnATest

# 启动服务器（自动打开浏览器）
python run.py
```

**或者使用Python自带的HTTP服务器：**

```bash
cd QnATest/src
python -m http.server 8000
```

然后在浏览器打开 `http://localhost:8000`

### 方式2️⃣：使用Node.js HTTP服务器

```bash
# 需要先安装 http-server
npm install -g http-server

# 启动
cd QnATest/src
http-server
```

### 方式3️⃣：使用其他Web服务器

任何能提供静态文件服务的Web服务器都可以，比如：
- Apache、Nginx、IIS 等

**关键点：**
- 将 `src/` 目录设为Web根目录
- 配置 `/data/` 路径能访问到 `data/` 目录的 `questions.json` 文件

---

## 📖 文档和指南

### 📚 用户文档

| 文档 | 说明 | 适用人群 |
|------|------|---------|
| [docs/QUICKSTART.md](docs/QUICKSTART.md) | ⚡ 5分钟快速开始 | 所有用户 |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | 🔧 详细安装配置（Windows/Mac/Linux） | 第一次安装 |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | 📁 项目文件结构说明 | 想了解项目的人 |
| [docs/00-START-HERE.md](docs/00-START-HERE.md) | 📖 文档导航中心 | 不知道看哪个文档 |

### 🛠️ 技术文档

| 文档 | 说明 | 适用人群 |
|------|------|---------|
| [docs/MULTI_SELECT_FIX.md](docs/MULTI_SELECT_FIX.md) | 🎯 多选题实现说明 | 开发者 |
| [docs/TEST_CHECKLIST.md](docs/TEST_CHECKLIST.md) | ✅ 功能测试验证清单 | 测试和开发者 |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | 📋 项目文件结构 | 开发者 |

### 📊 版本和维护

| 文档 | 说明 | 适用人群 |
|------|------|---------|
| [CHANGELOG.md](CHANGELOG.md) | 📝 版本更新日志 | 维护者和用户 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 🤝 贡献指南 | 想贡献代码的人 |

---

## 🎯 使用流程

### 答题流程
```
启动应用 → 加载第1题 → 选择答案 → 提交 → 查看结果
   ↓
显示解析 → 点击"下一题" → ... → 完成所有题
   ↓
显示完成统计 → 可以查看错题或重新开始
```

### 错题回顾流程
```
点击"错题回顾" → 显示错题列表 → 点击错题 → 跳转到该题
                                    ↓
                            查看题目和解析
                                    ↓
                            可以重新作答或返回列表
```

### 侧边栏功能
- 📊 **查看统计** - 显示学习进度和错题列表
- ❌ **错题回顾** - 直接查看所有错题
- 🔄 **重新开始** - 清除所有进度，从头开始
- 📍 **题号跳转** - 输入题号直接导航

---

## 🛠️ 技术栈

### 前端
- **HTML5** - 语义化标记
- **CSS3** - 响应式设计、Flexbox布局
- **原生JavaScript** - 无框架依赖，纯JS逻辑

### 后端
- **Python 3** - 轻量级HTTP服务器（仅用于本地开发）
- **SimpleHTTPServer** - Python内置，无需额外依赖

### 数据存储
- **LocalStorage** - 浏览器本地存储，自动保存进度
- **JSON** - 题库数据格式

### 特点
✨ **零依赖** - 除了Python环境，无需安装任何第三方库
⚡ **离线运行** - 完全离线工作，无需网络连接
🔒 **隐私安全** - 所有数据保存在本地浏览器，不上传任何信息

---

## 📁 项目结构

完整的文件夹结构说明请查看 **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**

快速预览：
```
QnATest/
├── src/                     # 🌐 Web应用源代码
├── data/                    # 📊 题库数据
├── docs/                    # 📚 详细文档
├── scripts/                 # 🛠️ 工具脚本
├── .github/                 # 🔗 GitHub配置
├── run.py                   # 🚀 启动脚本
├── LICENSE                  # 📄 许可证
├── CONTRIBUTING.md          # 🤝 贡献指南
├── README.md                # 📖 本文件
└── ... 其他说明文件
```

---

## 💡 常见问题

### Q1: 如何离线使用？
A: 下载项目后，在本地启动HTTP服务器即可。所有题库已内置，无需网络连接。

### Q2: 我的答题进度保存在哪里？
A: 进度保存在浏览器的 LocalStorage 中。清除浏览器数据或使用隐私模式会丢失进度。

### Q3: 可以导出我的答题数据吗？
A: 可以！在浏览器F12开发者工具中输入：
```javascript
JSON.parse(localStorage.getItem('ai102_progress'))
```

### Q4: 为什么有些题是多选的？
A: Azure AI-102考试中确实包含多选题。系统自动检测答案中的"、"符号来判断是单选还是多选。

### Q5: 如何重做某一道题？
A: 在错题列表中点击该题，或在侧边栏输入题号跳转到该题。

### Q6: 支持其他语言吗？
A: 目前仅支持中文。如需其他语言支持，欢迎 Fork 并贡献！

更多常见问题见 **[docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md) 的故障排除部分**

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

详细的贡献指南见 **[CONTRIBUTING.md](CONTRIBUTING.md)**

### 贡献类型
- 🐛 **Bug修复** - 报告和修复问题
- ✨ **新功能** - 提出和实现改进
- 📚 **文档** - 改进说明和文档
- 🌍 **翻译** - 支持更多语言
- 📝 **题库** - 补充和更新题目

---

## 📝 更新日志

### v1.1.0 (2026-04-17)
- ✨ 实现了错题一键跳转功能
- 🎨 优化了错题列表的交互体验（悬停动画）
- 📱 改进了移动端布局
- 📚 完善了GitHub上传前的所有配置

### v1.0.0 (2026-04-10)
- ✅ 支持290道完整题库
- ✅ 多选题支持（答案排序无关）
- ✅ 进度自动保存
- ✅ 错题统计和回顾
- ✅ 响应式设计
- ✅ 题号快速导航

更详细的版本历史见 **[docs/CHANGELOG.md](docs/CHANGELOG.md)**

---

## 📄 许可证

本项目采用 **MIT 许可证**。详见 [LICENSE](LICENSE) 文件。

您可以自由地：
- ✅ 使用本项目用于学习、教育、商业目的
- ✅ 修改本项目代码
- ✅ 重新发布本项目

但需要：
- 保留许可证声明
- 包含原始的版权通知

---

## 👨‍💻 作者和致谢

**项目维护者** - 初始开发和维护

感谢：
- Azure 官方提供的认证考试题库资源
- 所有贡献者的支持和反馈
- 所有使用本系统进行学习的朋友

---

## 📞 联系方式

- 🐙 GitHub Issues: [提交问题](../../issues)
- 💬 GitHub Discussions: [讨论区](../../discussions)
- 📧 Email: [联系维护者]

---

## ⭐ 如果有帮助，请给个Star ⭐

如果本项目对你的学习有帮助，请给个 Star！这是对作者最大的鼓励。

---

**最后更新**: 2026年04月17日  
**Python版本**: 3.6+  
**浏览器支持**: Chrome、Firefox、Safari、Edge 最新版本

👉 **第一次使用？** 查看 [docs/QUICKSTART.md](docs/QUICKSTART.md)  
👉 **需要安装帮助？** 查看 [SETUP_GUIDE.md](SETUP_GUIDE.md)  
👉 **想看文件结构？** 查看 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
