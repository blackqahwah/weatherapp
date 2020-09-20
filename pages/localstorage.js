const lemo = {

    $message: null,

    set: (e) => {
        localStorage.message = e.currentTarget.value;
    },

    bind: () => {
        lemo.$message.innerText = localStorage.message;
    },

    setAndBind: (e) => {
        lemo.set(e);
        lemo.bind();
    },

    load: () => {
        lemo.$message = document.querySelector('#searchbox');
        lemo.bind();
    }

};

window.addEventListener('DOMContentLoaded', lemo.load);

const keys = Object.keys(localStorage);
console.log(keys);