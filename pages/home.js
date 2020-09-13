const demo = {

    $message: null,

    fetchCurrent: async () => {
        try {

            const response = await fetch
('https://api.openweathermap.org/data/2.5/weather?q=New York&exclude=minutely,hourly,daily&mode=html&appid=324ac8652cb0e662c90f3678aa7a88cf');

            const json = await response.text();
            // const message = JSON.stringify(json);


            demo.$message.innerHTML = json;
           
            
        } catch (e) {
            console.log(e);
        }
   
    },
    
        load: () => {
        demo.$message = document.querySelector('#message');
    }
};

window.addEventListener('DOMContentLoaded', demo.load);

    

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            try {
                const registration = await navigator.serviceWorker.register('index.sw.js');
                console.log('Service worker registration sucessful');
                console.log(`Registered with scope: ${registration.scope}`);
            } catch (e) {
                debugger;
                console.log('Service worker registration failed');
                console.log(e);
            }
        });
    }