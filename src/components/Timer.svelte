<script>
  import {writable,get} from 'svelte/store';


/*START OF TIMER*/
export let QUIZ_TIME = 0.1;

var timerInterval;
const minutesToSeconds = (minutes => minutes * 60);
const secondsToMinutes = seconds => Math.floor(seconds / 60);
const padWithZeroes = number => number.toString().padStart(2, '0');

let quizTime = minutesToSeconds(parseFloat(QUIZ_TIME));


const formatTime = (timeInSeconds) => {
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  };

export function startTimer(){
    timerInterval = setInterval(() => {
      --quizTime;
      if(quizTime == 0)
          stopTimer();
      }, 1000);
};
function stopTimer(){
    clearInterval(timerInterval);
  };


  /*END OF TIMER*/

    startTimer();
</script>



{formatTime(quizTime)}
