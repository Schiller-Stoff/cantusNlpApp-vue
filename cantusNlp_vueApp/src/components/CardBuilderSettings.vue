<template>
    <div class="container">
      <form class="form-inline">
        <div class="form-group mb-2">
          <label for="LO_select" class="sr-only">Email</label>
          <select id="LO_select" class="form-control form-control">
            <option v-for="corpus in corpora">{{ corpus.name }}</option>
          </select>
        </div>
        <div class="form-group mb-2">
          <label for="LO_view_select" class="sr-only">Email</label>
          <select id="LO_view_select" class="form-control form-control">
            <option>Ansicht wählen</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mb-2">LO hinzufügen</button>
      </form>
    </div>
</template>

<script>
    export default {
      name: "CardBuilderSettings",
      props: ["corpora"]
    }
</script>

<style scoped>

  .container {
    margin-top: 1%;
    margin-left:7.5%;
  }

  .form-group {
    margin-right: 1.5em;
  }

</style>
