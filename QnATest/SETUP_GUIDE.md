# 🔧 详细设置指南

本指南会帮助你在不同操作系统上正确安装和运行 AI-102 问答系统。

---

## 📋 系统要求

### 必需
- **Python 3.6+** 或其他任何Web服务器
- **现代浏览器**（Chrome、Firefox、Safari、Edge 最新版本）
- **互联网**（仅用于第一次访问GitHub和下载，之后离线可用）

### 可选
- **Git** - 用于版本控制和管理
- **Node.js** - 如果想用npm工具

---

## 🖥️ Windows 用户

### 第1步：检查 Python 版本

打开 **PowerShell** 或 **命令提示符**：

```cmd
python --version
```

**结果应该是 3.6 或更高版本**

如果显示 "python: command not found"，需要：
1. 从 https://www.python.org/downloads/ 下载Python
2. 安装时 **一定要勾选** "Add Python to PATH"
3. 重启命令窗口

### 第2步：下载项目

选择一个方式：

**方式A：使用Git（推荐）**
```bash
git clone https://github.com/你的用户名/QnATest.git
cd QnATest
```

**方式B：直接下载ZIP**
1. 访问 GitHub 仓库页面
2. 点击 "Code" → "Download ZIP"
3. 解压到你想要的位置

### 第3步：启动服务器

进入项目目录：
```bash
cd QnATest
```

运行启动脚本：
```bash
python run.py
```

**预期结果：**
- 显示服务器已启动信息
- 浏览器自动打开应用
- 看到"🎓 AI-102 问答系统"界面

### 常见问题

#### 问：端口8000被占用怎么办？
```bash
# 修改 run.py 中的 PORT 变量
# 找到这一行：PORT = 8000
# 改为其他未使用的端口，如 PORT = 8888
```

#### 问：浏览器没有自动打开？
手动在浏览器中输入：`http://localhost:8000`

#### 问：出现"Address already in use"错误？
说明端口被占用，尝试杀死占用端口的进程：
```bash
# Windows 使用 netstat 查看
netstat -ano | findstr :8000

# 杀死进程（PID替换为实际的进程ID）
taskkill /PID PID /F
```

---

## 🍎 macOS 用户

### 第1步：检查 Python 版本

打开 **终端**：

```bash
python3 --version
```

如果版本低于 3.6，从 https://www.python.org/downloads/ 下载安装。

### 第2步：下载项目

```bash
# 使用 Git
git clone https://github.com/你的用户名/QnATest.git
cd QnATest

# 或者手动下载并解压
```

### 第3步：启动服务器

```bash
python3 run.py
```

### 第4步：打开应用

浏览器会自动打开，或手动访问：`http://localhost:8000`

### 常见问题

#### 问：没有 Python？
```bash
# 使用 Homebrew 安装
brew install python3

# 或从官方网站下载
https://www.python.org/downloads/macos/
```

#### 问：端口被占用？
```bash
# 查看占用8000端口的进程
lsof -i :8000

# 杀死进程
kill -9 PID
```

---

## 🐧 Linux 用户

### 第1步：检查 Python 版本

```bash
python3 --version
```

### 第2步：安装依赖（如需）

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install python3

# CentOS/RHEL
sudo yum install python3

# Fedora
sudo dnf install python3
```

### 第3步：下载项目

```bash
git clone https://github.com/你的用户名/QnATest.git
cd QnATest
```

### 第4步：启动服务器

```bash
python3 run.py
```

### 第5步：打开浏览器

访问：`http://localhost:8000`

---

## 🌐 使用其他 Web 服务器

如果不想用Python的HTTP服务器，可以用其他选择：

### Apache

```bash
# 配置虚拟主机
# 将 src/ 目录设为文档根目录
# 配置 /data/ 别名到 data/ 目录
```

### Nginx

```nginx
server {
    listen 8000;
    server_name localhost;

    root /path/to/QnATest/src;
    
    location /data/ {
        alias /path/to/QnATest/data/;
    }

    index index.html;
}
```

### IIS (Windows)

1. 在IIS中创建新网站
2. 指向 `QnATest\src` 目录
3. 配置虚拟目录 `/data` 指向 `QnATest\data`

### Docker

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY . .
CMD python -m http.server 8000 --directory src
```

启动：
```bash
docker build -t ai102-qa .
docker run -p 8000:8000 ai102-qa
```

---

## 📱 移动设备访问

### 在同一网络中访问

1. 在电脑启动服务器
2. 查看你的电脑IP地址：
   ```bash
   # Windows
   ipconfig
   
   # macOS/Linux
   ifconfig
   ```

3. 在手机/平板的浏览器中访问：
   ```
   http://你的电脑IP:8000
   ```

### 示例
- Windows电脑IP: `192.168.1.100`
- 手机访问: `http://192.168.1.100:8000`

---

## 🚀 使用启动脚本 (run.py)

### 功能说明

`run.py` 脚本会：
1. 自动启动HTTP服务器
2. 配置正确的目录映射
3. 打开默认浏览器
4. 显示有用的提示信息

### 手动停止服务器

按 `Ctrl+C` 停止服务器

### 自定义端口

编辑 `run.py`：
```python
PORT = 8000  # 改为你想要的端口
```

---

## 🧪 验证安装

安装完成后，验证一切正常：

### 1. 检查题库数据
在浏览器控制台输入：
```javascript
// 应该返回290个题目
fetch('/data/questions.json')
    .then(r => r.json())
    .then(data => console.log(`题库有 ${data.length} 道题`))
```

### 2. 检查本地存储
```javascript
// 检查进度保存功能
localStorage.setItem('test', 'success');
console.log(localStorage.getItem('test'));  // 应该显示 'success'
localStorage.removeItem('test');
```

### 3. 尝试答题
- 点击一个答案
- 点击"提交答案"按钮
- 应该显示结果和解析

---

## 🔧 故障排除

### 问题1：浏览器显示"无法访问此网站"
**解决：**
- 检查服务器是否运行中（终端应该有输出）
- 检查URL是否正确：`http://localhost:8000`
- 检查防火墙设置

### 问题2：显示题库数据不加载
**解决：**
- 打开浏览器控制台（F12）
- 查看"Network"标签，检查 `/data/questions.json` 是否加载
- 确保 `/data/` 路径配置正确

### 问题3：答题进度丢失
**解决：**
- 检查是否使用了隐私/无痕模式
- 检查浏览器是否禁用了LocalStorage
- 尝试清除浏览器缓存

### 问题4：某些题目显示不正确
**解决：**
- 刷新页面
- 清除浏览器缓存
- 检查浏览器开发者工具中是否有JavaScript错误

### 问题5：多选题无法选择多个选项
**解决：**
- 确保运行的是最新版本（v1.0.0+）
- 刷新页面
- 查看浏览器控制台是否有错误信息

---

## 📞 获取帮助

如果仍有问题：

1. **查看文档**
   - [README.md](../README.md) - 项目总体介绍
   - [QUICKSTART.md](QUICKSTART.md) - 快速开始
   - [PROJECT_STRUCTURE.md](../PROJECT_STRUCTURE.md) - 项目结构

2. **查看类似的Issue**
   - 访问 [Issues页面](../../issues)
   - 搜索相关问题

3. **提出新Issue**
   - 点击 "New Issue"
   - 详细描述你的问题
   - 包括操作系统、Python版本等信息

4. **讨论和交流**
   - 访问 [Discussions页面](../../discussions)
   - 分享你的想法和经验

---

## ✅ 下一步

安装完成后：

1. **浏览题库** - 查看不同类型的题目
2. **做几道题** - 熟悉答题流程
3. **查看统计** - 查看学习进度
4. **回顾错题** - 使用错题功能
5. **设置目标** - 制定学习计划

祝你学习愉快！🎓
