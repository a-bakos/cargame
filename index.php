<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Fjalla+One" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Teko" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu+Condensed" rel="stylesheet">
  </head>
  <body>

    <section class="main-screen player-name-input-area">
      <h1 class="main-screen-title">Dashboard<br>Driver</h1>

      <div class="extras-section">
        <h2 class="main-screen-subtitle"></h2>
        <label for="extra-sunroof">Want sunroof?</label>
        <input type="checkbox" class="extra-sunroof" id="extra-sunroof">
      </div>

      <p class="input-info">Enter player name up to 12 characters.</p>
      <input type="text" maxlength="10" placeholder="Playername" class="player-name input-field" autofocus><br>
      <button type="submit" class="player-name input-submit" id="enter-player-name">Start!</button>

      <div class="cheatsheet">
        <h2>Instructions</h2>
        <p>Regularly check the dashboard and the message wall for tips and tasks.</p>
        <p>Navigate the car with the left and right arrows.</p>
        <p>Press L to turn the lights on/off.</p>
        <p>Press Q and E to toggle the left and right indicator lights.</p>
        <p>Open the doors with the A and D buttons.</p>
      </div>
    </section>

    <section class="mainframe hide-element">
      <section class="gameframe">

        <div class="lamp-post">
          <div class="post-elem"></div>
          <div class="head-support"></div>
          <div class="lamp-head"></div>
        </div>
        <div class="roadtrack track-left roadtrack-separator roadtrack-motion"></div>
        <div class="roadtrack track-right roadtrack-motion"></div>
        <div class="pothole"></div>

        <div class="vehicle">
          <div class="vehicle-glass"></div>
          <div class="vehicle-roof"></div>

          <div class="vehicle-doors vehicle-left-door">
            <div class="vehicle-mirrors vehicle-left-mirror"></div>
          </div>
          <div class="vehicle-doors vehicle-right-door">
            <div class="vehicle-mirrors vehicle-right-mirror"></div>
          </div>

          <div class="vehicle-headlights headlights-left"></div>
          <div class="vehicle-headlights headlights-right"></div>
          <div class="vehicle-taillights taillights-left"></div>
          <div class="vehicle-taillights taillights-right"></div>
          <div class="vehicle-front-indicators front-indicator-left indicator-left"></div>
          <div class="vehicle-front-indicators front-indicator-right indicator-right"></div>
          <div class="vehicle-rear-indicators rear-indicator-left indicator-left"></div>
          <div class="vehicle-rear-indicators rear-indicator-right indicator-right"></div>
        </div>

      </section>
      <section class="user-panel">

        <section class="game-details">
        <table>
          <tr>
            <td>
              <section class="info-unit">

                <div class="wallet">
                  <p class="user-money">Balance: $<span class="money-amount"></span></p>
                  <p class="unread-msg">Unread messages: <span class="msg-amount">0</span></p>
                </div>

                <ul class="msg-wall">
                </ul>
              </section>
            </td> <!-- message wall -->

            <td class="dashboard-area">
              <div class="dashboard">

                <div class="clock-area">
                  <span class="clock-date small-text">--- DD-MM-YYYY</span>
                  <span class="clock-time small-text inverse-disp">--:--</span>
                  <span class="celsius-display small-text">25&#176;C</span><br>
                  <span class="model small-text">Impson e7</span>
                  <img class="status-icon icon-bluetooth" src="img/bluetooth-off.png" title="Bluetooth">
                  <img class="status-icon icon-message" src="img/message-off.png" title="Message notification">
                  <img class="status-icon icon-wifi" src="img/wifi.png" title="WiFi">
                  <img class="status-icon icon-network" src="img/network.png" title="Network">
                  <img class="status-icon icon-driver" src="img/driver.png" title="Driver">
                  <span class="the-player-name small-text"></span>
                </div>

                <div class="odometer-area">
                  <span class="odo-text small-text inverse-disp">ODO</span><span class="odometer large-text">----.--</span><span class="odo-km-text small-text">km</span>
                </div>

                <div class="energy-area">
                  <img class="status-icon icon-energy" src="img/energy.png" title="Energy charge">
                  <span class="energy-state large-text">---.--</span>
                  <span class="energy-text small-text">%</span><br>
                  <!--
                  <span class="small-text">ET</span>
                  <span class="elapsed-time small-text">-:--:--</span>
                  -->
                </div>

                <div class="status-icons-area">
                  <img class="status-icon icon-left-index" src="img/index-left-off.png" title="Left indicators">
                  <img class="status-icon icon-battery" src="img/battery-off.png" title="Battery">
                  <img class="status-icon icon-lights" src="img/light-off.png" title="Lights">
                  <img class="status-icon icon-engine" src="img/engine-off.png" title="Engine">
                  <img class="status-icon icon-doors" src="img/doors-off.png" title="Doors">
                  <img class="status-icon icon-right-index" src="img/index-right-off.png" title="Right indicators">
                </div>
              </div>
            </td> <!-- dashboard -->

            <td>
              <section class="license-plate">
                <div class="plate-base">
                  <div class="plate-sticker">&nbsp;</div><p class="plate-text">CALIFORNIA</p><div class="plate-sticker">'83</div>
                  <p class="plate-identifier" data-text="AUM 560">AUM 560</p>
                </div>
              </section>
              <p class="plate-title">Your license plate<br>
                <a href="http://www.worldlicenceplates.com/usa/US_CAXX.html" target="_blank">(based on a real design)</a>
              </p>
            </td> <!-- license plate -->
          </tr>
        </table>
        </section>
      </section>
    </section> <!-- mainframe -->

    <section class="gameover-screen hide-element">
      <h2 class="main-screen-title">Out of energy!</h2>

      <!-- Restart the game -->
      <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <input name="" type="submit" value="Restart!" class="input-submit">
      </form>
    </section>

    <script src="latinise.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>