<template>
    <div class="container-fluid">
      <h4>Wilkommen zur erweiterten Suche von Cantus Network</h4>
      <p>Die erweiterte Suche besteht aus drei Modi, die über die Auswahlbuttons aktiviert werden können:</p>
      <br>
      <ol>
        <li>
          <p>Erweiterte Volltextsuche</p>
        </li>
        <li>
          <p>Einfache Incipitsuche</p>
        </li>
        <li>
          <p>Erweiterte Incipitsuche</p>
        </li>
      </ol>
      <br>

      <p>Verwenden Sie die Eingabefelder, um nach Text zu suchen. Schränken Sie mit Hilfe der Auswahllisten oder -buttons das Suchergebnis ein.</p>

      <p>Verwenden Sie * als Platzhalter um Ihre Suchanfrage auf ähnliche Schreibweisen auszudehnen. (z.B. Gregor* für "Gregorius", "Gregorii" etc.) </p>

      <p>Haben Sie bitte Verständnis, dass die Suchanfragen etwas Zeit in Anspruch nehmen können.</p>

      <p>Weitere Hinweise zur Bedienung erhalten Sie bei den einzelnen Suchmodi.</p>

    </div>
</template>

<script>
    export default {
        name: "TheSearchHelpText"
    }
</script>

<style scoped lang="scss">

  hr {
    border: none;
    padding:.25em;
    background-color: lightgrey;
    border-radius: 5em;
  }

  h5 {
    text-decoration: underline;
  }
</style>
