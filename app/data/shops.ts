
export type Shop = {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: string;
  photo: string;
  ownerPhoto: string;
  description: string;
  x: number;
  y: number;
};

type ShopDetails = Omit<Shop, "id" | "name" | "x" | "y">;

const shopLocations: Pick<Shop, "id" | "name" | "x" | "y">[] = [
  { id: 1, name: "忠順美", x: 27.32, y: 64.11 },
  { id: 2, name: "33活力早餐", x: 27.52, y: 84.27 },
  { id: 3, name: "豬芙蕾", x: 73.96, y: 38.10 },
  { id: 4, name: "巧味豬腳", x: 8.72, y: 86.09 },
  { id: 5, name: "Baksa窯烤披薩", x: 56.17, y: 52.22 },
  { id: 6, name: "基本麵食館", x: 20.94, y: 36.19 },
  { id: 7, name: "客家仙草", x: 80.67, y: 45.46 },
  { id: 8, name: "政大茶亭", x: 76.51, y: 47.78 },
  { id: 9, name: "壹豆先生", x: 41.54, y: 46.67 },
  { id: 10, name: "豆花日嚐", x: 73.76, y: 17.24 },
  { id: 11, name: "純地瓜球", x: 41.95, y: 76.21 },
  { id: 12, name: "首思義", x: 79.19, y: 48.79 },
  { id: 13, name: "徒巷", x: 44.83, y: 39.42 },
  { id: 14, name: "老味道", x: 73.62, y: 43.55 },
  { id: 15, name: "滿豐牛肉麵", x: 49.60, y: 43.65 },
  { id: 16, name: "敘緣小館", x: 76.44, y: 32.76 },
  { id: 17, name: "軌跡", x: 21.61, y: 39.01 },
  { id: 18, name: "咚！關東煮", x: 38.59, y: 80.14 },
  { id: 19, name: "捲毛蜜汁燒烤", x: 76.04, y: 23.49 },
  { id: 20, name: "健康滷味", x: 89.53, y: 48.69 },
];

// 只需要在這裡填寫每家店的詳細資訊
const shopDetails: Record<number, Partial<ShopDetails>> = {
  1: {
    type: "早餐",
    address: "台北市文山區忠順里興隆路四段 141 號",
    phone: "(02)2939-2092",
    hours: "07:00 - 12:00",
    description: "炒蘿蔔糕＆雞蛋灌餅",
  },
 
  2: {
    type: "早餐",
    address: "台北市文山區樟腳里木新路三段 122 號",
    phone: "(02)2234-5728",
    hours: "06:30 - 12:30 (每週一、四公休)",
    description: "招牌肉蛋土司",
  },
 
 3: {
    type: "早餐",
    address: "台北市文山區萬興里新光路一段 28 號",
    phone: "0937-912-298",
    hours: "10:00 - 20:00 (每週六、日公休)",
    description: "現做舒芙蕾鬆餅",
  },
 
 4: {
    type: "午餐",
    address: "台北市文山區樟文里木新路三段 310 巷 4 號 (12 號攤位) ",
    phone: "0921-051-212",
    hours: "07:00-13:00 (每週一公休)",
    description: "綜合豬腳便當",
  },
 
 5: {
    type: "午餐",
    address: "台北市文山區木新里永安街 22 巷 40 號 ",
    phone: "0930-381-530",
    hours: "11:00-14:00；16:00-21:00(每週一公休)",
    description: "瑪格麗特披薩、嗆辣墨西哥披薩",
  },
 
 6: {
    type: "午餐",
    address: "台北市文山區明興里興隆路四段 79 號 ",
    phone: "(02)8661-8963",
    hours: "11:30-14:00；17:00-20:30 (每週日公休)",
    description: "排骨蛋炒飯、紅油炒手",
  },
 
 7: {
    type: "下午茶",
    address: "台北市文山區萬興里指南路二段 79 號 ",
    phone: "(02)8661-6912",
    hours: "14:00-23:00 (每週日公休)",
    description: "客家燒仙草、黑糖剉冰",
  },
 
 8: {
    type: "下午茶",
    address: "台北市文山區萬興里指南路二段 12 號 ",
    phone: "(02)8661-0884",
    hours: "10:20-21:30",
    description: "珍珠綠豆沙牛奶",
  },
 
 9: {
    type: "下午茶",
    address: "台北市文山區木柵路三段 48 巷 1 弄 2 號",
    phone: "(02)2234-5755",
    hours: "09:30-19:00 (每週四公休)",
    description: "精品手沖咖啡",
  },
 
 10: {
    type: "下午茶",
    address: "台北市文山區萬興里新光路一段 138 號",
    phone: "(02)8661-8668",
    hours: "13:00-22:00 (每週一、二公休)",
    description: "綜合鮮奶豆花",
  },
 
 11: {
    type: "下午茶",
    address: "台北市文山區順興里木新路二段 272 號",
    phone: "0933-346-658",
    hours: "15:00-20:00 (每週六、日 14:30開賣)",
    description: "現炸地瓜球",
  },
 
 12: {
    type: "晚餐",
    address: "台北市文山區萬興里指南路三段 32 巷 2 樓",
    phone: "(02)8661-1525",
    hours: "11:00-21:00 (每週六、日公休)",
    description: "香煎雞腿排義大利麵",
  },
 
 13: {
    type: "晚餐",
    address: "台北市文山區木柵里指南路三段 49 巷 12 號",
    phone: "(02)2939-5598",
    hours: "11:00-14:00；17:00-00:30 (每週五、六營業至01:30)",
    description: "松露薯條、冰淇淋起司蛋糕",
  },
 
 14: {
    type: "晚餐",
    address: "台北市文山區萬興里指南路二段 17 號",
    phone: "(02)2937-6848",
    hours: " 11:30-14:00；17:00-22:00 (每週二公休)",
    description: "紅燒牛腩鍋、十全大補燒酒雞",
  },
 
 15: {
    type: "晚餐",
    address: "台北市文山區木柵里木柵路三段 102 巷 2 號",
    phone: "(02)8661-2553",
    hours: "11:00-15:00；17:00-21:00 (每週三公休)",
    description: "牛肉麵（加提味三件套）",
  },
 
 16: {
    type: "晚餐",
    address: "台北市文山區萬興里新光路一段 53 號",
    phone: "(02)2938-4448",
    hours: "11:30-14:00，17:00-20:30 (每週一、二公休)",
    description: "金沙豆腐、乾煸四季豆",
  },
 
 17: {
    type: "宵夜",
    address: "台北市文山區明萬里興隆路四段 85 號",
    phone: "(02)2938-5108",
    hours: "19:30-02:00",
    description: "各式創意調酒",
  },
 
 18: {
    type: "宵夜",
    address: "台北市文山區木新路三段 32 號",
    phone: "0922 - 212 - 036",
    hours: "17:30 - 24:00 (目前已終止營業)",
    description: "已成絕響的關東煮",
  },
 
 19: {
    type: "宵夜",
    address: "台北市文山區萬興里秀明路二段 6 之 1 號",
    phone: "0987-851-300",
    hours: "19:30-23:30 (每週六、日公休)",
    description: "無骨雞腿排、脆皮五花肉",
  },
 
 20: {
    type: "宵夜",
    address: "台北市文山區萬興里指南路二段 149 號",
    phone: "請至現場點餐",
    hours: "16:00-00:30",
    description: "沙茶風加熱滷味",
  }, 
};

export const shops: Shop[] = shopLocations.map((shop) => ({
  ...shop,
  type: "待補：店家類型",
  address: "待補：完整地址",
  phone: "待補：聯絡電話",
  hours: "待補：營業時間",
  photo: `/images/shops/shop-${String(shop.id).padStart(2, "0")}.webp`,
  ownerPhoto: `/images/owners/owner-${String(shop.id).padStart(2, "0")}.webp`,
  description: "請填入店家特色與招牌料理。",
  ...shopDetails[shop.id],
}));
