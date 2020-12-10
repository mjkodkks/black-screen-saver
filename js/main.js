(() => {
    const brightnessRange = document.getElementById('brightness');
    const bg = document.getElementById('bg');
    const container = document.getElementById('container');

    window.onload = function() {
        inactivityTime(); 
      }

    brightness.oninput = (e)=> {
        const rangeInput = e.target.value;
        bg.style.opacity = (+rangeInput / 100)
    }

    const inactivityTime = ()=> {
        var time;
        window.onload = resetTimer;
        // DOM Events
        document.onmousemove = resetTimer;
        document.onkeypress = resetTimer;
    
        function toolLeave() {
            brightnessRange.classList.remove("fade-in");
            brightnessRange.classList.add("fade-out");

            setTimeout(()=> {
                brightnessRange.style.display = 'none'
            },300)
        }
    
        function resetTimer() {
            clearTimeout(time);
            brightnessRange.classList.remove("fade-out");
            brightnessRange.classList.add("fade-in");
            brightnessRange.style.display = 'flex'
            time = setTimeout(toolLeave, 3000)
        }
    };

})();