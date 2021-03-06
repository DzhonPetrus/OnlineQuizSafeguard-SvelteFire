<script>
/*START OF ACTIVITY LOGGING*/

export let activityLog = [];
const getDateTime = () => {
  var date = new Date().toJSON().slice(0,10);
  var time = new Date().toJSON().slice(11,19)
  return date+' '+time;
  };

const pushLog = (event, description, currTime) => {
  activityLog = [...activityLog, {
    "event": event,
    "time": currTime,
    "description": description,
  }];

/* console.log(activityLog); */
  };


/*END OF ACTIVITY LOGGING*/

	/* ACTIVITY LOG */
	window.onfocus = () =>  pushLog("Focused",`User refocused on the window at ${getDateTime()}`, getDateTime());
	window.onblur = () =>  pushLog("Defocused",`User left the window at ${getDateTime()}`, getDateTime());
</script>
<!--
{#if $activityLog.length > 0}
	{#each $activityLog as log}
		{log.event}
		<br>

		{log.description}
		<br>

	{/each}
{/if}

-->
