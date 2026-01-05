
import tkinter as tk
from tkinter import filedialog, messagebox
from tkhtmlview import HTMLLabel

class HTMLDesigner(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Python版 HTML Designer")
        self.geometry("1000x700")

        # 菜单栏
        menubar = tk.Menu(self)
        filemenu = tk.Menu(menubar, tearoff=0)
        filemenu.add_command(label="新建", command=self.new_file)
        filemenu.add_command(label="打开", command=self.open_file)
        filemenu.add_command(label="保存", command=self.save_file)
        filemenu.add_separator()
        filemenu.add_command(label="退出", command=self.quit)
        menubar.add_cascade(label="文件", menu=filemenu)
        self.config(menu=menubar)

        # 编辑区
        self.text = tk.Text(self, wrap="none", font=("Consolas", 12))
        self.text.pack(side="left", fill="both", expand=True)
        self.text.bind("<KeyRelease>", self.update_preview)

        # 预览区
        self.preview = HTMLLabel(self, html="<h3>实时预览区</h3>", background="white")
        self.preview.pack(side="right", fill="both", expand=True)

        self.current_file = None

    def new_file(self):
        self.text.delete("1.0", tk.END)
        self.preview.set_html("<h3>实时预览区</h3>")
        self.current_file = None

    def open_file(self):
        file_path = filedialog.askopenfilename(filetypes=[("HTML文件", "*.html;*.htm")])
        if file_path:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            self.text.delete("1.0", tk.END)
            self.text.insert(tk.END, content)
            self.current_file = file_path
            self.update_preview()

    def save_file(self):
        if not self.current_file:
            file_path = filedialog.asksaveasfilename(defaultextension=".html", filetypes=[("HTML文件", "*.html;*.htm")])
            if not file_path:
                return
            self.current_file = file_path
        with open(self.current_file, "w", encoding="utf-8") as f:
            f.write(self.text.get("1.0", tk.END))
        messagebox.showinfo("保存", "文件已保存！")

    def update_preview(self, event=None):
        html_code = self.text.get("1.0", tk.END)
        self.preview.set_html(html_code)

if __name__ == "__main__":
# """
# Python版 HTML Designer
# 主程序已迁移到 src/app.py
# 请运行 src/app.py 启动桌面应用。
# """
