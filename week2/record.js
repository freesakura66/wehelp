//task1
console.log("task1 Result")
function findAndPrint(messages, currentStation) {
    //建立一個名為【greenStation】的陣列紀錄綠線的捷運站名並把"Xiaobitan"放到最後面等之後額外處理
    const greenStation = ["Songshan", "Nanjing Sanmin", "Taipei Arena", "Nanjing Fuxing", "Songjiang Nanjing", "Zhongshan", "Beimen", "Ximen", "Xiaonanmen", "Chiang Kai-Shek Memorial Hall", "Guting", "Taipower Building", "Gongguan", "Wanlong", "Jingmei", "Dapinglin", "Qizhang", "Xindian City Hall", "Xindian", "Xiaobitan"];
    //建立一個空物件【friendStations】紀錄朋友和朋友所在車站
    let friendStations = {};
    //指示物件【messages】為具有friend:message配對的資料庫
    for (let friend in messages) {
        let message = messages[friend];
        //將陣列greenStation內的資料視為station
        for (let station of greenStation) {
            //將message中含有station的資料提出來
            if (message.includes(station)) {
                //將提出來的station資料以friend:station的形式儲存在物件【friendStations】中
                friendStations[friend] = station;
                break;
            }
        }
    }
    //建立紀錄朋友和與朋友的距離的空物件【distances】
    let distances = {};

    for (let friend in friendStations) {
        let station = friendStations[friend];
        //此處的「let distance;」是確保每次循環開始時distance的值都要被重置以重新計算
        let distance;
        // 若朋友所在位置和我在的位置都在"Xiaobitan"的狀況
        if (station === "Xiaobitan" && currentStation === "Xiaobitan") {
            distance = Math.abs(greenStation.indexOf("Qizhang") - greenStation.indexOf("Qizhang"));
        } //朋友在"Xiaobitan"而我不在"Xiaobitan"的狀況
        else if (station === "Xiaobitan") {
            distance = Math.abs(greenStation.indexOf(currentStation) - greenStation.indexOf("Qizhang")) + 1;
        } //朋友不在"Xiaobitan"而我在"Xiaobitan"的狀況
        else if (currentStation === "Xiaobitan") {
            distance = Math.abs(greenStation.indexOf("Qizhang") - greenStation.indexOf(station));
        } //正常不考慮支線"Xiaobitan"的狀況
        else {
            distance = Math.abs(greenStation.indexOf(currentStation) - greenStation.indexOf(station));
        }
        //將結果放入物件【distances】中
        distances[friend] = distance;
    }

    //若物件【distances】內朋友(key)數量大於0
    if (Object.keys(distances).length > 0) {
        //新增參數minDistance紀錄物件【distances】的距離(value)最小值
        let minDistance = Math.min(...Object.values(distances));
        //新增陣列紀錄滿足距離最小值的朋友
        let closestFriends = Object.keys(distances).filter(friend => distances[friend] === minDistance);
        //若只有一個朋友距離最近則印出該朋友名字
        if (closestFriends.length === 1) {
            let closestFriend = closestFriends[0];
            console.log(closestFriend);
            //若多於一個朋友則印出"沒有人特別靠近你"
            //-應該也可以直接印出closestFriend的陣列
        } else {
            console.log("沒有人特別靠近你");
        }
        //只有messages內無資料時才會出現這個情況
    } else {
        console.log("No Messages");
    }
}

// 代碼測試
const messages = {
    "Leslie": "I'm at home near Xiaobitan station.",
    "Bob": "I'm at Ximen MRT station.",
    "Mary": "I have a drink near Jingmei MRT station.",
    "Copper": "I just saw a concert at Taipei Arena.",
    "Vivian": "I'm at Xindian station waiting for you."
};

findAndPrint(messages, "Wanlong");
findAndPrint(messages, "Songshan");
findAndPrint(messages, "Qizhang");
findAndPrint(messages, "Ximen");
findAndPrint(messages, "Xindian City Hall");
//task2
console.log("task2 Result")
function book(consultants, hour, duration, criteria) {
    //建立一個統計有空顧問的陣列【freeTimeconsultant】
    let freeTimeconsultant = [];
    //查詢陣列【consultants】內所有資料consultant
    for (let consultant of consultants) {
        //設定一個新參數booked用來標記特定是斷是否被預訂
        //先假設所有時間都沒被預訂>>false
        let booked = false;
        //將顧客要求的諮詢時間放入consultant的schedule屬性忠看資料是否重疊
        for (let i = hour; i < hour + duration; i++) {
            //-這邊的條件句方法是用&&很有趣
            if (consultant.schedule && consultant.schedule[i]) {
                //若資料重疊則將booked的值改成已預訂true並跳出迴圈
                booked = true;
                break;
            }
        }
        //若booked=false則將此consultant資料放入陣列【freeTimeconsultant】
        if (!booked) {
            freeTimeconsultant.push(consultant);
        }
    }
    //若陣列【freeTimeconsultant】資料為空代表沒有顧問有空直接印出"No Service"
    if (freeTimeconsultant.length === 0) {
        console.log("No Service");
        //直接傳出結果不用繼續跑程式了
        return;
    }
    //若標準是"price"則陣列【freeTimeconsultant】資料由屬性為"price"的值的高低排列
    //-sort((a, b) => a.屬性 - b.屬性)為資料一屬性比大小；a-b為低到高而b-a為高到低
    if (criteria === "price") {
        freeTimeconsultant.sort((a, b) => a.price - b.price);
    } else if (criteria === "rate") {
        freeTimeconsultant.sort((a, b) => b.rate - a.rate);
    }
    //印出結果
    console.log(freeTimeconsultant[0].name);
    //建立新參數selectedConsultant來記錄被選到的顧問
    let selectedConsultant = freeTimeconsultant[0];
    for (let i = hour; i < hour + duration; i++) {
        //若selectedConsultant內的屬性為schedule的值不存在就為其添加{}
        if (!selectedConsultant.schedule) {
            selectedConsultant.schedule = {};
        }
        //接著把預約刀ˋ的時間段都添加到schedule上並標記為已預約(true)
        selectedConsultant.schedule[i] = true;
    }
}

const consultants = [
    { name: "John", rate: 4.5, price: 1000 },
    { name: "Bob", rate: 3, price: 1200 },
    { name: "Jenny", rate: 3.8, price: 800 }
];
//將陣列【consultants】的資料取名為consultant
for (let consultant of consultants) {
    //在每個consultant中添加屬性為schedule的資料，該屬性的值預設為{}
    consultant.schedule = {};
}

book(consultants, 15, 1, "price");  // Jenny
book(consultants, 11, 2, "price");  // Jenny
book(consultants, 10, 2, "price");  // John
book(consultants, 20, 2, "rate");   // John
book(consultants, 11, 1, "rate");   // Bob
book(consultants, 11, 2, "rate");   // No Service
book(consultants, 14, 3, "price");  // John
//task3
console.log("task3 Result")
function func(...data) {
    let nameList = [...data];
    let middleNameList = [];
    let middleNameNum = [];

    for (let name of data) {
        if (name.length <= 3) {
            let temp = name[1];
            middleNameList.push(temp);
        } else {
            let temp = name[2];
            middleNameList.push(temp);
        }
    }

    for (let i = 0; i < middleNameList.length; i++) {
        //-(list).filter(item=>item===(condition))將list中符合condition條件的資料提出來組成新的list
        //將middleNameList內依照index逐一對照資料數量並放進middleNameNum中
        middleNameNum.push(middleNameList.filter(item => item === middleNameList[i]).length);
    }
    //若middleNameNum內有包含1的資料
    if (middleNameNum.includes(1)) {
        //建立新參數去計算middleNameNum中有出現幾個1
        let count = middleNameNum.filter(item => item === 1).length;
        //若middleNameNum有多個1表示有多個獨特中間名回傳"有多個獨特的中間名"
        if (count > 1)
            console.log("有多個獨特的中間名")
        //反之則只有一個獨特中間名就回傳擁有唯一獨特中間名的人名
        else {
            console.log(nameList[middleNameNum.indexOf(1)]);
        }
        //若middleNameNum內沒有1代表沒有獨特中間名回傳"沒有"
    } else {
        console.log("沒有");
    }
}

func("彭大牆", "陳王明雅", "吳明"); // print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花"); // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆"); // print 夏曼藍波安

//task4
console.log("task4 Result")
function getNumber(index) {
    let mathList = [];
    for (let i = 0; i < 1000; i++) {
        let temp;
        if (i % 3 === 0) {
            //-Math.floor()無條件捨去到整數
            temp = (Math.floor(i / 3)) * 7;
            mathList.push(temp);
        } else if (i % 3 === 1) {
            temp = (Math.floor(i / 3)) * 7 + 4;
            mathList.push(temp);
        } else {
            temp = (Math.floor(i / 3)) * 7 + 8;
            mathList.push(temp);
        }
    }

    console.log(mathList[index]);
}

// 函數驗證
getNumber(1); // print 4
getNumber(5); // print 15
getNumber(10); // print 25
getNumber(30); // print 70