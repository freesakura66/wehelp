console.log("task1 Result")
function findAndPrint(messages, currentStation) {
    const greenStation = ["Songshan", "Nanjing Sanmin", "Taipei Arena", "Nanjing Fuxing", "Songjiang Nanjing", "Zhongshan", "Beimen", "Ximen", "Xiaonanmen", "Chiang Kai-Shek Memorial Hall", "Guting", "Taipower Building", "Gongguan", "Wanlong", "Jingmei", "Dapinglin", "Qizhang", "Xindian City Hall", "Xindian", "Xiaobitan"];
    let friendStations = {};
    for (let friend in messages) {
        let message = messages[friend];
        for (let station of greenStation) {
            if (message.includes(station)) {
                friendStations[friend] = station;
                break;
            }
        }
    }
    let distances = {};
    for (let friend in friendStations) {
        let station = friendStations[friend];
        let distance;
        if (station === "Xiaobitan" && currentStation === "Xiaobitan") {
            distance = Math.abs(greenStation.indexOf("Qizhang") - greenStation.indexOf("Qizhang"));
        } else if (station === "Xiaobitan") {
            distance = Math.abs(greenStation.indexOf(currentStation) - greenStation.indexOf("Qizhang")) + 1;
        } else if (currentStation === "Xiaobitan") {
            distance = Math.abs(greenStation.indexOf("Qizhang") - greenStation.indexOf(station));
        } else {
            distance = Math.abs(greenStation.indexOf(currentStation) - greenStation.indexOf(station));
        }
        distances[friend] = distance;
    }
    if (Object.keys(distances).length > 0) {
        let minDistance = Math.min(...Object.values(distances));
        let closestFriends = Object.keys(distances).filter(friend => distances[friend] === minDistance);
        if (closestFriends.length === 1) {
            let closestFriend = closestFriends[0];
            console.log(closestFriend);
        } else {
            console.log("沒有人特別靠近你");
        }
    } else {
        console.log("No Messages");
    }
}

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

console.log("task2 Result")
function book(consultants, hour, duration, criteria) {
    let freeTimeconsultant = [];
    for (let consultant of consultants) {
        let booked = false;
        for (let i = hour; i < hour + duration; i++) {
            if (consultant.schedule && consultant.schedule[i]) {
                booked = true;
                break;
            }
        }
        if (!booked) {
            freeTimeconsultant.push(consultant);
        }
    }
    if (freeTimeconsultant.length === 0) {
        console.log("No Service");
        return;
    }
    if (criteria === "price") {
        freeTimeconsultant.sort((a, b) => a.price - b.price);
    } else if (criteria === "rate") {
        freeTimeconsultant.sort((a, b) => b.rate - a.rate);
    }
    console.log(freeTimeconsultant[0].name);
    let selectedConsultant = freeTimeconsultant[0];
    for (let i = hour; i < hour + duration; i++) {
        if (!selectedConsultant.schedule) {
            selectedConsultant.schedule = {};
        }
        selectedConsultant.schedule[i] = true;
    }
}

const consultants = [
    { name: "John", rate: 4.5, price: 1000 },
    { name: "Bob", rate: 3, price: 1200 },
    { name: "Jenny", rate: 3.8, price: 800 }
];
for (let consultant of consultants) {
    consultant.schedule = {};
}

book(consultants, 15, 1, "price");
book(consultants, 11, 2, "price");
book(consultants, 10, 2, "price");
book(consultants, 20, 2, "rate");
book(consultants, 11, 1, "rate");
book(consultants, 11, 2, "rate");
book(consultants, 14, 3, "price");

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
        middleNameNum.push(middleNameList.filter(item => item === middleNameList[i]).length);
    }

    if (middleNameNum.includes(1)) {
        let count = middleNameNum.filter(item => item === 1).length;
        if (count > 1)
            console.log("有多個獨特的中間名")
        else {
            console.log(nameList[middleNameNum.indexOf(1)]);
        }
    } else {
        console.log("沒有");
    }
}

func("彭大牆", "陳王明雅", "吳明");
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花");
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花");
func("郭宣雅", "夏曼藍波安", "郭宣恆");

console.log("task4 Result")
function getNumber(index) {
    let mathList = [];
    for (let i = 0; i < 1000; i++) {
        let temp;
        if (i % 3 === 0) {
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

getNumber(1);
getNumber(5);
getNumber(10);
getNumber(30);
