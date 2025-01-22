let weather = {
  apiKey: "S7Y1gfiSCcB5DoxqK",
  fetchWeather: function (city) {
    const url = `https://api.seniverse.com/v3/weather/daily.json?key=${this.apiKey}&location=${city}&language=zh-Hans&unit=c`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const daily = result.daily[0]; // 获取当天的天气数据

      document.querySelector(".city").innerText = "Weather in " + result.location.name;
      document.querySelector(".description").innerText = daily.text_day;
      document.querySelector(".temp").innerText = `${daily.high}°C / ${daily.low}°C`;
      document.querySelector(".humidity").innerText = "湿度: " + daily.humidity + "%";
      document.querySelector(".wind").innerText = "风速: " + daily.wind_speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");

      // 使用本地图片作为背景
      const cityImages = {
        "Shanghai": "shanghai.jpg",
        "Wuhan": "wuhan.jpg",
        "Beijing": "beijing.jpg",
        "Changsha": "changsha.jpg",
        "Enshi": "enshi.jpg",
        "Hangzhou": "hangzhou.jpg",      
        "Laifeng": "laifeng.jpg",
        "Qingdao": "qingdao.jpg",
        "Sichuan": "sichuan.jpg",
        // 可以添加更多城市和对应图片
      };

      const imageName = cityImages[result.location.name] || "default.jpg"; // 如果城市没有对应图片，使用默认图片
      document.body.style.backgroundImage = `url('img/${imageName}')`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      console.error('No results found');
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// 初始加载时查询上海的天气
weather.fetchWeather("Lanzhou");