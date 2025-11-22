# 🎓 Berkeley Where-To-Go

[🇺🇸 English](README.md)

<div align="center">

**一个专为加州大学伯克利分校学生设计的智能校园路线规划应用**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-API-4285F4?logo=google-maps)](https://developers.google.com/maps)

帮助新生和全体学生轻松规划课间路线，准时到达教室！

### [🚀 在线使用](https://berkeleywheretogo.vercel.app)

</div>

---

## 📸 功能预览

### 👋 欢迎界面

![FrontPage](src/assets/FrontPage.jpg)

### 👶 新生模式选择

![BuildingSelectPanel_Freshman](src/assets/BuildingSelectPanel_Freshman.jpg)

### 🎓 高级模式选择

![BuildingSelectPanel_Advanced](src/assets/BuildingSelectPanel_Advanced.jpg)

### 🗺️ 静态路线展示

![staticRouteDisplay](src/assets/staticRouteDisplay.jpg)

### 🚶 动态导航演示

![dynamicRouteDisplay1](src/assets/dynamicRouteDisplay1.gif)
![dynamicRouteDisplay2](src/assets/dynamicRouteDisplay2.gif)

---

## 💡 开发初衷

作为大一新生，在选课时我们常面临一个难题：**"把两节课排在一起（Back-to-back）真的来得及吗？"**

即使有 "Berkeley Time" 的 10 分钟缓冲，从校园一端赶到另一端依然让人心里没底。我开发这个项目的初衷，就是为了帮你**直观地测试两个教学楼之间的通勤时间**。无论是步行还是滑板车，都能让你对路程耗时心中有数，从而更自信、更从容地规划每一学期的课表。

---

## ✨ 核心特性

### 🗺️ 智能地图导航

- **Google Maps 集成** - 基于真实地理数据的精确路线规划
- **坡度可视化路线** - 路线颜色根据陡峭程度动态变化
  - 🔵 **浅蓝**：平缓路线 (< 3% 坡度)
  - 🔵 **中蓝**：中等坡度 (3-8% 坡度)
  - 🔵 **深蓝**：陡峭路段 (> 8% 坡度)
- **智能路线标记** - 优雅的起点/终点标识，显示完整建筑名称
- **动态标记定位** - 标记自动调整位置，避免遮挡路线
- **一键重置** - 即时清除地图数据，配备流畅的淡出动画

### 📊 海拔分析工具

- **海拔剖面图** - 实时显示路线的地形变化
- **爬升数据统计** - 显示总爬升高度和海拔范围
- **坡度图例** - 地图上清晰的坡度等级说明

### 🏢 智能建筑选择器

- **双重选择模式** - 满足不同需求：
  - 👶 **新生模式**：精选 38 个新生必备建筑
  - 🎓 **高级模式**：包含 100+ 个校园地点的完整数据库
- **全屏浮动面板** - 现代化的建筑选择界面，浮动在地图上方
- **实时搜索** - 支持建筑名称即时搜索过滤
- **分类浏览** - 全面的分类系统：
  - 📚 **学术**：STEM、人文、艺术、商科、图书馆
  - 🏠 **校园生活**：宿舍、餐饮、体育、学生活动中心
  - 🔬 **科研**：LBNL、研究所、实验室
  - 🏛️ **行政与地标**：Sproul、钟楼等
- **网格布局展示** - 所有建筑一目了然（目前仅支持电脑端）
- **智能交互** - 支持 ESC 键关闭、点击切换等便捷操作

### 🏛️ 建筑数据库

覆盖 **100+ 个校园建筑**（高级模式），包括：

- **主要教学楼**：Dwinelle, Wheeler, Pimentel, VLSB, Evans
- **工程学院**：Soda, Cory, Etcheverry, Jacobs, Hearst Mining
- **专业学院**：Haas, Berkeley Law, Optometry
- **图书馆**：Moffitt, Doe, Kresge, East Asian, Bancroft
- **学生宿舍**：Units 1-3, Blackwell, Foothill, Clark Kerr, I-House
- **体育设施**：Memorial Stadium, RSF, Haas Pavilion
- **科研中心**：LBNL, Space Sciences Lab
- **校园地标**：Sather Gate, The Campanile

### ⏱️ 精确时间计算

- **多种交通方式**：

  - 🚶‍♂️ **步行时间** - 基于真实路线和地形
  - 🛴 **滑板车/自行车** - 快速出行选项（约为步行时间的 1/4）

- **实时 API 计算** - 基于 Google Maps Directions API 的准确估算

### 🎨 现代化 UI 设计

- **毛玻璃效果** - 优雅的模糊背景
- **流畅动画** - 基于 Framer Motion 的丝滑交互
- **响应式布局** - 完美适配桌面、平板和手机

- **浮动面板设计** - 所有 UI 元素带阴影效果，层次分明

---

## �🚀 快速开始

### 前置要求

- **Node.js** 18.x 或更高版本
- **Google Maps API Key** 需启用以下服务:
  - Maps JavaScript API
  - Places API
  - Directions API
  - Elevation API

### 安装步骤

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd berkeley-where-to-go

# 2. 安装依赖
npm install

# 3. 配置环境变量
# 创建 .env 文件并添加你的 Google Maps API Key
echo "VITE_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env

# 4. 启动开发服务器
npm run dev

# 5. 在浏览器中打开
# 通常是 http://localhost:5173
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

---

## 📖 使用指南

### 基本操作

1. **选择起点**

   - 点击 "Start" 输入框
   - 浮动选择面板将出现在右侧
   - 使用搜索或分类浏览找到建筑
   - 点击选择，面板自动关闭

2. **选择终点**

   - 点击 "Destination" 输入框
   - 同样的方式选择目的地建筑

3. **获取路线**

   - 点击 "Get Directions" 按钮
   - 等待路线计算（通常<2 秒）

4. **查看结果**

   - 🗺️ 地图上显示坡度编码路线
   - ⏱️ 左侧显示步行和滑板车时间
   - 📊 底部显示海拔剖面图
   - 🏷️ 查看路线坡度图例

---

## 🏗️ 项目结构

```
berkeley-where-to-go/
├── src/
│   ├── components/                    # 🧩 React 组件
│   │   ├── Header.jsx                # 🧭 页面标题与导航
│   │   ├── RouteInput.jsx            # ✏️ 路线输入表单
│   │   ├── BuildingSelect.jsx        # 🏢 建筑输入组件
│   │   ├── BuildingSelectionPanel.jsx # 🪟 建筑选择面板
│   │   ├── MapContainer.jsx          # 🗺️ 地图容器和路线渲染
│   │   ├── TravelTimeDisplay.jsx     # ⏱️ 时间显示卡片
│   │   └── ElevationChart.jsx        # 📊 海拔剖面图
│   ├── data/
│   │   ├── buildings.js              # 👶 新生模式建筑数据
│   │   └── advanced_building.js      # 🎓 高级模式完整建筑数据
│   ├── App.jsx                       # ⚛️ 主应用组件
│   ├── main.jsx                      # 🚪 应用入口
│   └── index.css                     # 🎨 全局样式
├── public/                           # 📦 静态资源
├── .env                              # 🔐 环境变量
├── package.json                      # 📦 项目依赖
├── vite.config.js                   # ⚡ Vite 配置
├── tailwind.config.js               # 🌬️ Tailwind 配置
└── README.md                        # 📖 项目文档
```

---

## 🛠️ 技术栈

### 核心框架

- ![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black) - 最新的 React 框架，支持并发特性
- ![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=flat-square&logo=vite&logoColor=white) - 极速开发构建工具
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) - 现代化原子 CSS 框架

### UI & 动画

- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-0055FF?style=flat-square&logo=framer&logoColor=white) - 高性能动画库
- ![Lucide Icons](https://img.shields.io/badge/Lucide_React-0.554.0-F56565?style=flat-square&logo=lucide&logoColor=white) - 精美图标库
- ![Recharts](https://img.shields.io/badge/Recharts-3.4.1-22B5BF?style=flat-square&logo=react&logoColor=white) - React 数据可视化图表

### 地图服务

- ![Google Maps](https://img.shields.io/badge/Google_Maps_API-Platform-4285F4?style=flat-square&logo=google-maps&logoColor=white) - Google Maps React 集成
- ![Google Maps JS](https://img.shields.io/badge/Google_Maps_JS-API-4285F4?style=flat-square&logo=google-maps&logoColor=white) - 地图显示
- ![Google Directions](https://img.shields.io/badge/Directions_API-Route-34A853?style=flat-square&logo=google-maps&logoColor=white) - 路线规划
- ![Google Elevation](https://img.shields.io/badge/Elevation_API-Terrain-EA4335?style=flat-square&logo=google-maps&logoColor=white) - 海拔数据获取

### 开发工具

- ![ESLint](https://img.shields.io/badge/ESLint-9.39.1-4B32C3?style=flat-square&logo=eslint&logoColor=white) - 代码质量保证
- ![PostCSS](https://img.shields.io/badge/PostCSS-8.5.6-DD3A0A?style=flat-square&logo=postcss&logoColor=white) - CSS 处理和兼容性

---

## 🎯 适用场景

### 👶 新生入学

- 快速熟悉校园地理位置
- 评估宿舍到教室的距离
- 提前规划开学第一周的路线

### 📅 课程规划

- 选课时评估课间转换时间
- 避免连续课程间距离太远
- 优化每日课程安排

### 🏃 日常通勤

- 选择最快/最平缓的路线
- 决定步行还是骑车/滑板车
- 了解路线的体力消耗

### 🎉 活动参与

- 快速找到活动地点
- 计划从宿舍/停车场的路线
- 为访客提供导航指引

---

## 🌍 部署方案

### 推荐平台

**Vercel** (推荐) ⭐

```bash
# 一键部署
npm install -g vercel
vercel
```

**Netlify**

```bash
# 拖拽 dist/ 文件夹即可
npm run build
```

**GitHub Pages**

```bash
# 构建并推送到 gh-pages 分支
npm run build
# 将 dist/ 内容部署到 GitHub Pages
```

### 环境变量配置

生产部署时，确保在平台上配置 `VITE_GOOGLE_MAPS_API_KEY`

---

## 📊 性能指标

| 指标         | 数值      |
| ------------ | --------- |
| 首屏加载时间 | < 3s      |
| 路线计算时间 | < 2s      |
| 海拔数据获取 | < 1s      |
| 移动端适配   | 🚧 开发中 |
| 响应式布局   | 🖥️ 电脑端 |
| PWA 支持     | 🔄 可扩展 |

---

## 🗺️ 路线图

### ✅ 已完成

- [x] Google Maps 核心集成
- [x] 100+ 校园建筑数据库（高级模式）
- [x] 智能建筑选择面板（分类、搜索）
- [x] 路线规划和时间计算
- [x] 海拔数据和坡度可视化
- [x] 现代化 UI 设计与动画交互
- [x] 自定义地图标记
- [x] 一键重置功能

### 🚧 规划中

- [ ] 移动端适配
- [ ] 保存常用路线
- [ ] 夜间模式
- [ ] PWA 离线支持
- [ ] 用户评论和建议功能

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 贡献流程

1. **Fork 本仓库**
2. **创建特性分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **提交更改**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **推送到分支**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **创建 Pull Request**

---

## 📝 更新日志

### v1.3.0 (Current - 2025-11)

- ✨ **一键重置** - 即时清除路线，配备流畅淡出动画
- ✨ **增强版页眉** - 优化视图切换与动画效果
- ✨ **Logo 集成** - 全新 "WhereToGo" 标识
- 🐛 **Bug 修复** - 解决地图聚焦和路线清除问题

### v1.2.0 (2025-11)

- ✨ **高级模式** - 包含 100+ 建筑的完整校园数据库
- ✨ **双重选择系统** - 自由切换新生/高级视图
- ✨ **全新分类** - 新增宿舍、体育、科研等类别
- ✨ **品牌升级** - 全新 Logo 和视觉优化

### v1.1.0 (2025-11)

- ✨ 全新建筑选择器 UI - 浮动面板设计
- ✨ 建筑分类系统 - 8 大类别
- ✨ 实时搜索功能
- ✨ 网格布局显示所有建筑
- ✨ ESC 快捷键和智能交互
- 🐛 修复标记遮挡路线问题
- 💄 UI 层次优化和阴影效果

### v1.0.0 (2025-11)

- ✨ 集成 Google Elevation API
- ✨ 海拔剖面图表
- ✨ 坡度颜色编码路线
- ✨ 自定义地图标记系统
- ✨ 升级到 React 19
- ✨ Framer Motion 动画
- ✨ Recharts 图表集成

### v0.1.0 (Initial)

- 基础路线规划
- 简单地图显示
- 时间计算

---

## 📄 许可证

本项目采用 **MIT License** 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 🙏 致谢

- **UC Berkeley** - 校园数据和灵感来源
- **Google Maps Platform** - 强大的地图和地理服务
- **React 社区** - 优秀的开源工具和库
- **所有贡献者** - 感谢每一位改进本项目的开发者

---

<div align="center">

**为伯克利学生精心打造**

🐻 _Go Bears!_ 🐻

> "帮助每个伯克利学生都能准时到达目的地，不再为课间转换时间而烦恼！"

[🐛 报告问题](https://github.com/your-repo/issues) · [✨ 功能建议](https://github.com/your-repo/issues) · [📖 文档](https://github.com/your-repo/wiki)

</div>
