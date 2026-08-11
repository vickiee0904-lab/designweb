from pathlib import Path
import shutil

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "assets" / "resume"
OUTPUT_PDF = OUTPUT_DIR / "XIA-UI-UX-Designer-Resume.pdf"
PUBLIC_PDF = PUBLIC_DIR / "xia-ui-ux-designer-resume.pdf"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")

NAVY = HexColor("#07142F")
INK = HexColor("#12264D")
BLUE = HexColor("#426EF0")
MUTED = HexColor("#65769A")
LIGHT = HexColor("#E8EEF9")
PALE = HexColor("#F5F8FD")
WHITE = HexColor("#FFFFFF")


def register_fonts():
    pdfmetrics.registerFont(TTFont("PingFang", str(FONT_PATH)))


def wrap_text(text, font_name, font_size, max_width):
    lines = []
    current = ""
    for char in text:
        candidate = current + char
        if current and pdfmetrics.stringWidth(candidate, font_name, font_size) > max_width:
            lines.append(current)
            current = char
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, max_width, font_size=8.4, leading=12, color=MUTED, max_lines=None):
    lines = wrap_text(text, "PingFang", font_size, max_width)
    if max_lines:
        lines = lines[:max_lines]
    c.setFont("PingFang", font_size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def section_label(c, text, x, y, width):
    c.setFillColor(BLUE)
    c.setFont("PingFang", 8)
    c.drawString(x, y, text)
    c.setStrokeColor(LIGHT)
    c.setLineWidth(0.7)
    label_width = pdfmetrics.stringWidth(text, "PingFang", 8)
    c.line(x + label_width + 12, y + 3, x + width, y + 3)


def draw_experience(c, y, period, company, role, items, x=198, width=350):
    c.setFillColor(BLUE)
    c.setFont("PingFang", 7.6)
    c.drawString(x, y, period)
    c.setFillColor(INK)
    c.setFont("PingFang", 11.2)
    c.drawString(x, y - 18, company)
    role_width = pdfmetrics.stringWidth(role, "PingFang", 7.2) + 16
    c.setFillColor(PALE)
    c.roundRect(x + width - role_width, y - 22, role_width, 16, 8, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont("PingFang", 7.2)
    c.drawCentredString(x + width - role_width / 2, y - 16.5, role)
    y -= 38
    for item in items:
        c.setFillColor(BLUE)
        c.circle(x + 3, y + 2.5, 1.5, fill=1, stroke=0)
        y = draw_wrapped(c, item, x + 12, y, width - 12, font_size=8.1, leading=11.2, max_lines=2)
        y -= 3
    c.setStrokeColor(LIGHT)
    c.line(x, y, x + width, y)
    return y - 14


def build_resume():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    register_fonts()

    width, height = A4
    c = canvas.Canvas(str(OUTPUT_PDF), pagesize=A4)
    c.setTitle("XIA - UI/UX Designer Resume")
    c.setAuthor("XIA")

    sidebar_width = 168
    c.setFillColor(WHITE)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.rect(0, 0, sidebar_width, height, fill=1, stroke=0)

    c.setFillColor(HexColor("#87A7FF"))
    c.circle(42, height - 54, 5, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PingFang", 28)
    c.drawString(36, height - 96, "XIA")
    c.setFillColor(HexColor("#9EADD0"))
    c.setFont("PingFang", 8.2)
    c.drawString(37, height - 114, "UI / UX DESIGNER")

    c.setFillColor(HexColor("#7D8EBA"))
    c.setFont("PingFang", 7.2)
    c.drawString(37, height - 164, "CONTACT")
    c.setFillColor(WHITE)
    c.setFont("PingFang", 7.7)
    c.drawString(37, height - 185, "lingxiao0904@qq.com")
    c.linkURL("mailto:lingxiao0904@qq.com", (37, height - 191, 148, height - 178), relative=0)

    side_y = height - 238
    for heading, lines in [
        ("FOCUS", ["B 端产品设计", "数据体验", "视觉系统", "跨端体验"]),
        ("CAPABILITIES", ["产品策略与信息架构", "交互原型与视觉设计", "设计系统与组件库", "AI 辅助设计协作"]),
        ("TOOLS", ["Figma", "Photoshop / Illustrator", "AI 设计工具"]),
    ]:
        c.setFillColor(HexColor("#7D8EBA"))
        c.setFont("PingFang", 7.2)
        c.drawString(37, side_y, heading)
        side_y -= 21
        c.setFillColor(HexColor("#D9E2FA"))
        c.setFont("PingFang", 8.4)
        for line in lines:
            c.drawString(37, side_y, line)
            side_y -= 17
        side_y -= 22

    x = 198
    main_width = 350
    c.setFillColor(INK)
    c.setFont("PingFang", 21)
    c.drawString(x, height - 57, "清晰地组织复杂体验")
    c.setFillColor(MUTED)
    c.setFont("PingFang", 8.6)
    intro = "专注产品体验与视觉系统的 UI 设计师。擅长把复杂业务、数据与任务流程转化为清晰、可信且可持续迭代的数字产品。"
    draw_wrapped(c, intro, x, height - 82, main_width, font_size=8.6, leading=13, max_lines=3)

    section_label(c, "工作经历 / EXPERIENCE", x, height - 133, main_width)
    y = height - 158
    y = draw_experience(c, y, "2021.12 - 2025.08", "南京斑马鱼数字智能科技有限公司", "UI 设计", [
        "负责 B 端数据管理平台及 C 端产品的 UI 设计与体验优化",
        "参与设计规范搭建与组件沉淀，提升界面一致性与设计效率",
        "负责企业官网视觉设计、品牌 VI 与营销推广物料",
    ])
    y = draw_experience(c, y, "2019.04 - 2020.06", "中通服网盈科技有限公司", "电商设计", [
        "负责天猫、京东等电商平台店铺视觉装修与首页布局",
        "完成商品主图、详情页、活动专题页与运营推广视觉",
    ])
    y = draw_experience(c, y, "2018.03 - 2019.02", "南京灵衍信息科技有限公司", "UI 设计", [
        "负责生活服务类小程序及 B 端后台界面设计与迭代优化",
        "参与需求梳理、设计走查、还原校验与功能体验测试",
    ])

    section_label(c, "代表项目 / SELECTED WORK", x, y, main_width)
    y -= 24
    for title, description in [
        ("科研数据管理平台", "面向科研实验室场景，重构项目、实验、样本与库存的连续任务体验。"),
        ("数据运营监控平台", "将分散的资产、安全与运营信号组织为可快速识别异常的数据视图。"),
        ("AI 设计规范与组件库", "利用 AI 辅助识别、生成与检查规范，再经人工校准沉淀为组件资产。"),
    ]:
        c.setFillColor(INK)
        c.setFont("PingFang", 9.2)
        c.drawString(x, y, title)
        y = draw_wrapped(c, description, x + 112, y, main_width - 112, font_size=7.8, leading=10.5, max_lines=2)
        y -= 8

    c.setStrokeColor(LIGHT)
    c.line(x, 42, x + main_width, 42)
    c.setFillColor(HexColor("#8290AD"))
    c.setFont("PingFang", 7)
    c.drawString(x, 27, "PORTFOLIO RESUME / UPDATED 2026")
    c.drawRightString(x + main_width, 27, "XIA")

    c.save()
    shutil.copyfile(OUTPUT_PDF, PUBLIC_PDF)
    print(OUTPUT_PDF)
    print(PUBLIC_PDF)


if __name__ == "__main__":
    build_resume()
