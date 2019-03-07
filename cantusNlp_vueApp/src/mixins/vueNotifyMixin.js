

export const vueNotifyMixin = {
  methods: {
    notify(title,msg){
      this.$notify({
        group: 'foo',
        title: title,
        text: msg
      });
    }
  }
}
