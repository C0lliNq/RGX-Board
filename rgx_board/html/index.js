var visable = false;

$(function () {
	window.addEventListener('message', function (event) {

		if (event.data.action == "updatePraca"){
			$('#praca').html(event.data.praca);
		}

		switch (event.data.action) {
			case 'toggle':
				if (visable) {
					$('#container').hide();
				} else {
					$('#container').show();
				}

				visable = !visable;
				break;

			case 'close':
				$('#container').hide();
				visable = false;
				break;

			case 'toggleID':

				if (event.data.state) {
					$('td:nth-child(2),th:nth-child(2)').show();
					$('td:nth-child(5),th:nth-child(5)').show();
				} else {
					$('td:nth-child(2),th:nth-child(2)').hide();
					$('td:nth-child(5),th:nth-child(5)').hide();
				}

				break;

			case 'updatePlayerJobs':
				var jobs = event.data.jobs;

				$('#player_count').html(jobs.player_count);

				$('#medic').html(jobs.ems);
				$('#police').html(jobs.police);
				$('#taxi').html(jobs.taxi);
				$('#mechanic').html(jobs.mechanic);
				break;

			case 'updatePlayerList':
				$('#playerlist tr:gt(0)').remove();
				$('#playerlist').append(event.data.players);
				applyPingColor();
				//sortPlayerList();
				break;

			case 'updatePing':
				updatePing(event.data.players);
				applyPingColor();
				break;

			case 'updateServerInfo':
				if (event.data.maxPlayers) {
					$('#max_players').html(event.data.maxPlayers);
				}

				if (event.data.uptime) {
					$('#server_uptime').html(event.data.uptime);
				}
				break;

			default:
				break;
		}
	}, false);
});


function sortPlayerList() {
	var table = $('#playerlist'),
		rows = $('tr:not(.heading)', table);

	rows.sort(function(a, b) {
		var keyA = $('td', a).eq(1).html();
		var keyB = $('td', b).eq(1).html();

		return (keyA - keyB);
	});

	rows.each(function(index, row) {
		table.append(row);
	});
}
