# 🚶‍♂️ Berkeley Where-To-Go

一个专为加州大学伯克利分校学生设计的智能校园路线规划应用，帮助新生和全体学生轻松规划课间路线，避免因"伯克利时间"不够而迟到。

![Berkeley Where-To-Go](https://img.shields.io/badge/Built%20for-UC%20Berkeley-blue) ![React](https://img.shields.io/badge/React-19.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.2.2-purple)

## ✨ 核心特性

### 🗺️ 智能地图导航
- **Google Maps集成**：基于真实地理数据的路线规划
- **自定义路线显示**：使用坡度颜色编码的路线可视化
- **自定义标记**：优雅的起点/终点标识系统

### 📊 海拔分析工具
- **海拔剖面图**：实时显示路线的地形变化
- **坡度可视化**：路线颜色根据陡峭程度变化
  - 🔵 **蓝色-浅**：平缓路线 (< 3%)
  - 🔵 **蓝色-中**：中等坡度 (3-8%)
  - 🔵 **蓝色-深**：陡峭路段 (> 8%)
- **爬升统计**：显示总爬升高度和海拔范围

### 🏢 智能建筑选择
- **自动完成搜索**：支持20个热门校园建筑
- **直观选择界面**：带有图标的建筑选择器
- **精确坐标定位**：基于真实GPS坐标

### ⏱️ 精确时间计算
- **多种交通方式**：
  - 🚶‍♂️ **步行时间**：考虑实际地形和时间
  - 🛴 **滑板车/自行车**：更快的替代方案
- **"伯克利时间"提醒**：超过10分钟的步行自动警告
- **实时路线计算**：基于Google Maps Directions API

### 🎨 优雅的UI设计
- **伯克利品牌色彩**：官方蓝金配色方案
- **流畅动画效果**：使用Framer Motion实现
- **响应式设计**：完美适配桌面和移动设备
- **毛玻璃效果**：现代化的界面设计

## 🚀 快速开始

### 环境要求
- Node.js (推荐 18.x 或更高版本)
- Google Maps API 密钥

### 安装步骤

1. **克隆项目**
```bash
git clone <项目地址>
cd berkeley-where-to-go
```

2. **安装依赖**
```bash
npm install
```

3. **配置API密钥**
```bash
# 编辑 .env 文件
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **构建生产版本**
```bash
npm run build
```

### 📋 Google Maps API 配置

**必需的API服务：**
- Maps JavaScript API
- Places API
- Directions API
- Elevation API

**配置步骤：**
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用上述API服务
4. 创建API密钥
5. 在 `.env` 文件中配置密钥

## 📱 使用指南

### 基本操作
1. **选择起点**：从下拉菜单中选择起始建筑
2. **选择终点**：选择目的地建筑
3. **获取路线**：点击"Get Directions"按钮
4. **分析结果**：
   - 查看地图上的彩色路线
   - 阅读时间估算
   - 分析海拔剖面图
   - 查看路线坡度信息

### 高级功能
- **海拔分析**：查看底部剖面图了解地形
- **坡度识别**：根据路线颜色判断陡峭程度
- **时间规划**：根据时间估算合理安排课表

## 🏗️ 项目架构

```
src/
├── components/           # React组件
│   ├── Header.jsx       # 页面头部
│   ├── MapContainer.jsx # 地图容器 & 路线渲染
│   ├── RouteInput.jsx   # 路线输入表单
│   ├── TravelTimeDisplay.jsx # 时间显示卡片
│   ├── ElevationChart.jsx    # 海拔剖面图
│   └── BuildingSelect.jsx    # 建筑选择器
├── data/
│   └── buildings.js     # 校园建筑数据库
├── App.jsx              # 主应用组件
└── main.jsx             # 应用入口
```

## 🛠️ 技术栈

### 前端框架
- **React 19.2.0** - 现代化前端框架
- **Vite 7.2.2** - 快速构建工具
- **TailwindCSS 4.1.17** - 原子化CSS框架

### UI组件 & 动画
- **Framer Motion** - 高性能动画库
- **Lucide React** - 现代图标库
- **Recharts** - 数据可视化图表

### 地图服务
- **@react-google-maps/api** - Google Maps React集成
- **Google Maps JavaScript API** - 地图显示和地理服务
- **Google Directions API** - 路线规划
- **Google Elevation API** - 海拔数据

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS处理
- **Autoprefixer** - CSS前缀自动添加

## 📊 支持的校园建筑

应用内置了20个最常用的伯克利校园建筑：

### 🏛️ 学术建筑
- Dwinelle Hall
- Wheeler Hall  
- Evans Hall
- Soda Hall
- Cory Hall

### 📚 图书馆
- Moffitt Library
- Doe Library
- Kresge Engineering Library

### 🏃 运动 & 生活
- Recreational Sports Facility (RSF)
- Martin Luther King Jr. Student Union
- Sproul Hall

### 🏢 学院建筑
- Haas School of Business
- Wurster Hall
- Stanley Hall
- Hearst Memorial Mining Building

*更多建筑数据请查看 `src/data/buildings.js`*

## 🎯 使用场景

### 新生入学
- 快速熟悉校园布局
- 规划课间转换路线
- 避免迟到和迷路

### 日常学习
- 优化课程表安排
- 选择最优教学楼
- 评估交通方式

### 特殊活动
- 参加校园活动
- 访问不同学院
- 访客导览

## 🌍 部署选项

### 静态托管平台
- **Vercel** (推荐) - 零配置部署
- **Netlify** - 拖拽式部署
- **GitHub Pages** - 免费托管
- **AWS S3 + CloudFront** - 企业级部署

### 自定义部署
```bash
# 构建项目
npm run build

# 部署 dist/ 目录到任何静态服务器
```

## 📈 项目状态

### ✅ 已完成功能
- [x] Google Maps 集成
- [x] 真实路线规划
- [x] 海拔数据分析
- [x] 坡度颜色编码
- [x] 自定义标记系统
- [x] 海拔剖面图表
- [x] 响应式设计
- [x] 动画效果
- [x] 伯克利品牌设计

### 🚀 性能指标
- **首屏加载**：< 3秒
- **路线计算**：< 2秒
- **海拔数据**：实时获取
- **移动端适配**：完美支持

## 📝 更新日志

### v1.0.0 (最新)
- ✨ 集成Google Elevation API
- ✨ 添加海拔剖面图
- ✨ 实现坡度颜色编码路线
- ✨ 自定义标记系统
- ✨ 升级到React 19
- ✨ 集成Framer Motion动画
- ✨ 添加Recharts图表

### v0.1.0
- 基础路线规划功能
- 简单的地图显示
- 时间计算

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发环境设置
```bash
# 克隆项目
git clone <项目地址>
cd berkeley-where-to-go

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行代码检查
npm run lint
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- UC Berkeley 官方提供的校园数据支持
- Google Maps API 提供的地理数据服务
- React 社区的优秀工具和库

---

**Made with ❤️ for UC Berkeley Students**

> 帮助每个伯克利学生都能准时到达目的地，不再为课间转换时间而烦恼！
