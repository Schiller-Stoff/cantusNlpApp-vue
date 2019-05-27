<template>
    <div class="container-fluid">
      <h4>Wilkommen zur erweiterten Suche von Cantus</h4>
      <p>Die erweiterte Suche von Cantus besteht aus drei unterschiedlichen Suchmodi, die über die Knöpfe darüber aufgerufen werden können</p>
      <br>
      <ol>
        <li>
          <p>Erweiterte Volltextsuche</p>
        </li>
        <li>
          <p>Erweiterte Volltextsuche auf Basis von Incipits</p>
        </li>
        <li>
          <p>Erweiterte Incipitsuche</p>
        </li>
      </ol>
      <br>

      <p>Verwenden Sie die Texteingabefelder um einen Suchbegriff in den Texten von Cantus zu suchen und schränken
      Sie mit Hilfe der Auswahllisten das Suchresultat ein.</p>

      <p>Die für Cantus erstellten RDF Daten werden dabei über SPARQL abgefragt und das Ergebnis mit Hilfe von Javascript etc. visualisiert.</p>

      <p>Weitere Bedienungshilfe wie zum Beispiel zu den möglichen und notwendigen Sucheinschränkungen erhalten Sie bei den einzelnen Suchmodi.</p>

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
