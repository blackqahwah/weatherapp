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