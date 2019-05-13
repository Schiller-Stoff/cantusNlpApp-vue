
export const incipitDummyDataMixin = {
  data(){
    return {
      testData:
        [
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#PUR.incipit.V2048.06011000.M.716","incipit": "Ecce Adam","r": "CantusID 006571"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#PUR.incipit.V2153.06021000.M.740","incipit": "Ubi est Abel","r": "CantusID 007804"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2291","incipit": "In principio fecit deus","r": "CantusID 006928"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2292","incipit": "In principio deus","r": "CantusID 006925"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2293","incipit": "Formavit igitur","r": "CantusID 006739"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2295","incipit": "Tulit ergo dominus","r": "CantusID 007798"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2296","incipit": "Dixit dominus","r": "CantusID 006473"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2297","incipit": "Immisit dominus","r": "CantusID 006883"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2299","incipit": "Dum deambularet dominus","r": "CantusID 006537"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2300","incipit": "In sudore vultus","r": "CantusID 006937"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06011000.M.2301","incipit": "Ubi est Abel","r": "CantusID 007804"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06021000.M.2350","incipit": "Ecce Adam,","r": "CantusID 006571"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2376","incipit": "Quadraginta dies","r": "CantusID 007454"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2377","incipit": "Ponam arcum","r": "CantusID 007391"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2378","incipit": "Per memetipsum","r": "CantusID 007375"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2380","incipit": "Aedificavit Noe","r": "CantusID 006055"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2381","incipit": "Locutus est dominus","r": "CantusID 007097"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2382","incipit": "Dum staret Abraham","r": "CantusID 006563"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2384","incipit": "Temptavit deus","r": "CantusID 007762"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2385","incipit": "Angelus domini","r": "CantusID 006098"
          }
          ,
          {
            "i": "https://gams.uni-graz.at/o:cantus.passau.ur#incipit.06031000.M.2386","incipit": "Caecus sedebat","r": "CantusID 006260"
          }
        ]
    }
  },
  methods: {
    testIncipitSearch(){
      let partArray = this.testData.slice(0, Math.floor(Math.random()*this.testData.length))
      console.log(partArray)
      return partArray
    }
  }
}
