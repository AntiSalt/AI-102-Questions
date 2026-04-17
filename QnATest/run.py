#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI-102 问答系统 - 快速启动脚本
将当前目录的 src 文件夹作为HTTP服务器根目录
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    """自定义处理器，指定服务器根目录为 src，并正确处理 data 目录映射"""
    
    def __init__(self, *args, directory=None, **kwargs):
        self.base_dir = directory  # 保存 src 目录路径
        self.project_root = Path(directory).parent  # 项目根目录
        super().__init__(*args, directory=directory, **kwargs)
    
    def translate_path(self, path):
        """重写路径转换，允许访问项目的 data 目录"""
        if path.startswith('/data/'):
            # 将 /data/ 请求映射到项目的 data/ 目录
            rel_path = path[1:]  # 移除开头的 /
            full_path = self.project_root / rel_path
            return str(full_path)
        else:
            # 其他请求使用默认处理（在 src 目录中）
            return super().translate_path(path)

def start_server():
    """启动HTTP服务器"""
    
    # 指定以src文件夹作为根目录
    src_dir = Path(__file__).parent / "src"
    
    PORT = 8000
    # 创建自定义处理器，指定 directory 参数
    def create_handler(*args, **kwargs):
        return CustomHandler(*args, directory=str(src_dir), **kwargs)
    
    HANDLER = create_handler
    
    print(f"""
╔════════════════════════════════════════════════╗
║   🎓 AI-102 问答系统 - HTTP服务器已启动      ║
╚════════════════════════════════════════════════╝

📂 服务器根目录: {src_dir}
🌐 访问地址: http://localhost:{PORT}
📖 按 Ctrl+C 停止服务器

正在启动...
    """)
    
    try:
        with socketserver.TCPServer(("", PORT), HANDLER) as httpd:
            print(f"✅ 服务器运行中...")
            print(f"✅ 请在浏览器打开: http://localhost:{PORT}")
            print()
            
            # 自动打开浏览器（可选）
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print("🌐 已自动打开浏览器")
            except:
                pass
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n⏹️  服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"\n❌ 错误：端口 {PORT} 已被占用")
            print("   请尝试：")
            print(f"   1. 关闭其他占用该端口的程序")
            print(f"   2. 修改脚本中的PORT变量为其他端口")
        else:
            print(f"\n❌ 错误: {e}")

if __name__ == "__main__":
    start_server()
