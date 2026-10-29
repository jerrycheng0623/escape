export const SCENES=[
 {model:'lobby',name:'永安旅館・櫃檯',objective:'查看櫃檯上的住宿登記簿',image:'lobby'},
 {model:'elevator',name:'第一關・不存在的四樓',objective:'檢查維修路線與鏡面計數',image:'elevator-final'},
 {model:'corridor',name:'四樓・404號房外',objective:'走到404門前，按E開門',image:'corridor'},
 {model:'guestroom',name:'第二關・住宿登記簿',objective:'在書桌比對四份房客照片',image:'guestroom'},
 {model:'bathroom',name:'第三關・另一個自己',objective:'走近鏡子，檢查不一致的細節',image:'bathroom'},
 {model:'surveillance',name:'第四關・不斷重播的監視器',objective:'重建事件，再檢查超前通道',image:'surveillance'},
 {model:'archive',name:'第五關・房間裡到底有幾個人',objective:'拼合報告，追查第二份紀錄來源',image:'archive'},
 {model:'corridor',name:'服務走道',objective:'前往櫃檯；確認前仍可原路返回',image:'corridor'},
 {model:'lobby',name:'第六關・退房',objective:'確認離館人數，或使用管理員印章',image:'lobby'}
];
export const PHOTOS=[{id:0,year:1998,name:'林澄',key:'K-17',word:'不',image:'photo-1998'},{id:1,year:2003,name:'陳禾',key:'K-42',word:'要',image:'photo-2003'},{id:2,year:2009,name:'許寧',key:'K-08',word:'開',image:'photo-2009'},{id:3,year:2016,name:'周予',key:'K-31',word:'門',image:'photo-2016'}];
export const IMAGE_ASSETS=[['corridor','四樓走廊'],['lobby','永安旅館櫃檯'],['elevator-final','電梯・無數字底圖'],['guestroom','404號房'],['bathroom','浴室'],['surveillance','監控室'],['archive','檔案室'],['photo-1998','1998 林澄'],['photo-2003','2003 陳禾'],['photo-2009','2009 許寧'],['photo-2016','2016 周予'],['photo-today','今日的調查者'],['ending-dawn','真正退房・清晨'],['menu-concept','首頁設計概念'],['puzzle-concept','2D解謎設計概念']];
export const MODELS=[['lobby','櫃檯大廳'],['elevator','電梯'],['corridor','四樓走廊'],['guestroom','404客房'],['bathroom','浴室'],['surveillance','監控室'],['archive','檔案室'],['clerk','服務人員'],['double','鏡中擬態'],['stamp','管理員印章']];
IMAGE_ASSETS.push(['mirror-real','鏡面機關・實景快照'],['mirror-other','鏡面機關・異常快照'],['texture-wood','生成材質・胡桃木'],['texture-plaster','生成材質・舊灰泥'],['texture-green','生成材質・深綠漆面']);
export const HINTS={1:['維修口有路線卡。','依①～④對應的樓層按鍵操作。','依序按2、6、1、3，再確認維護。'],2:['重量與人像顯示不同。','鏡面是輔助計數，不是主感測。','關閉鏡面輔助，再重新檢查。'],3:['照片上的鑰匙牌可連到住宿表。','由入住年份早到晚排列。','依K-17、K-42、K-08、K-31排列。'],4:['回看公告與照片背字。','門外的清點不值得回應。','選保持沉默，或等待倒數完畢。'],5:['比較狀態與數量，而非正常左右翻轉。','注意門、毛巾、水、時鐘、浴缸旁。','標出五處：門開閉、毛巾1/2、滴水、03:17/18、拖鞋。'],6:['查看照片背面三步圖。','翻轉照片、遮住臉，再對齊四角。','四角依①②③④讀為7183。'],7:['追蹤行李、電話及登記狀態。','接電話之後才會由櫃檯受理。','順序是入住、接電話、櫃檯受理、離開。'],8:['比對母鐘與通道時間。','空房未必代表安全。','控制盒斷開03:18的D通道，關螢幕不算。'],9:['頁眉編號與接縫可以拼出文件。','看見、候補與核定是不同步驟。','A B C D；核對題依序選否、櫃檯退房確認、否。'],10:['每年的名字不同，但來源未變。','查來源類別與ROOM-404。','第二份紀錄來源是404號房。'],11:['本人與候補不是同一身分。','輸入2會正式核定另一位。','選1可自己離開；撤銷入口在原始住宿頁。'],12:['管理條款可以撤銷無效房號。','需要印章、已讀條款與來源分析。','回檔案室取印章，在原始入住頁使用並確認撤銷。']};
export const REPORT=['01｜擬態會透過影像設備形成。','02｜觀察擬態，不等同正式核定身分。','03｜口頭清點建立候補；櫃檯退房確認才取得離館資格。','04｜房號來源無效時，管理員得以「查無此房」印章撤銷原始入住及候補。'];
