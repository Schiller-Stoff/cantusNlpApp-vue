<template>
    <div class="container">
      <form class="form-inline">
        <div class="form-group mb-2">
          <label for="LO_select" class="sr-only">Email</label>
          <select id="LO_select" class="form-control form-control">
            <option>Hier LO auswählen</option>
          </select>
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputPassword2" class="sr-only">Password</label>
          <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary mb-2">LO hinzufügen</button>
      </form>
    </div>
</template>

<script>
    export default {
        name: "CardBuilderSettings"
    }
</script>

<style scoped>

  .container {
    margin-top: 1%;
    margin-left:7.5%;
  }

</style>
