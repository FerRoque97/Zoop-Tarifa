<template>
  <v-app>
    <v-card flat height="100px" tile>
      <v-toolbar dense color="grey darken-2">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title class="">YC Pay</v-toolbar-title>
      </v-toolbar>
    </v-card>
    <v-flex class="pa-4">
      <template class="pl-12">
        <v-card class="grey darken-2">
          <v-card-title>
            Clientes YC
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisa"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            class="grey lighten-2"
            :headers="headers"
            :items="customers"
            :search="search"
          ></v-data-table>
        </v-card>
      </template>
    </v-flex>

    <template>
      <v-footer padless class="grey darken-2">
        <v-col class="text-center" cols="12" color="Black">
          {{ new Date().getFullYear() }} — <strong>Tarifas ZooP</strong>
        </v-col>
      </v-footer>
    </template>
  </v-app>
</template>
 
<script>
import HelloWorld from "./components/HelloWorld";
import clientes from "./services/clientes";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    customers: [],
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nome / EC",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "CPF/CNPJ", value: "doc" },
      { text: "Valor em Conta", value: "current" },
      { text: "Valor a Receber", value: "account" },
      // { text: "Protein (g)", value: "protein" },
      // { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    // editedItem: {
    //   name: "",
    //   calories: 0,
    //   fat: 0,
    //   carbs: 0,
    //   protein: 0,
    // },
    // defaultItem: {
    //   name: "",
    //   calories: 0,
    //   fat: 0,
    //   carbs: 0,
    //   protein: 0,
    // },
  }),

  mounted() {
    const arrayTeste = [];
    clientes.listar().then((resposta) => {
      // console.log(resposta.data.items);
      var array = resposta.data.items;

      // console.log(array.length);

      // this.customers = this.customers[array.length];

      // console.log(this.customers)

      array.forEach((customer) => {
        let customerName;
        let customerDoc;
        let currentBalance;
        let accountBalance;
        console.log(customer);
        if (customer.type == "business") {
          customerName = customer.business_name;
          customerDoc = this.maskCnpj(customer.ein);
          currentBalance = customer.current_balance;
          accountBalance = customer.account_balance;
        }

        if (customer.type == "individual") {
          customerName = `${customer.first_name} ${customer.last_name}`;
          customerDoc = this.maskCpf(customer.taxpayer_id);
          currentBalance = customer.current_balance;
          accountBalance = customer.account_balance;
        }

        currentBalance = parseFloat(currentBalance);
        currentBalance = currentBalance.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        accountBalance = parseFloat(accountBalance);
        accountBalance = accountBalance.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        // console.log(currentBalance);

        const novoCustomer = {
          name: customerName,
          doc: customerDoc,
          current: currentBalance,
          account: accountBalance,
        };

        this.customers.push(novoCustomer);
      });

      // for (let index = 0; index < array.length; index++) {

      //   if (array[index].type == "business") {

      //     this.customers[index].name = array[index].business_name;

      //   } else if  (array[index].type == "individual"){

      //     this.customers[index].name = array[index].first_name;

      //   }
      //   console.log(this.customers);

      // }
      // console.log(this.desserts)
      // this.desserts = this.customers;
      // console.log(this.customers);
      // console.log("Aqui troca");
      // console.log(this.desserts);
    });
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    maskCpf(v) {
      v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
      v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
      return v;
    },

    maskCnpj(v) {
      v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
      v = v.replace(/^(\d{2})(\d)/, "$1.$2"); //Coloca ponto entre o segundo e o terceiro dígitos
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); //Coloca ponto entre o quinto e o sexto dígitos
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2"); //Coloca uma barra entre o oitavo e o nono dígitos
      v = v.replace(/(\d{4})(\d)/, "$1-$2"); //Coloca um hífen depois do bloco de quatro dígitos
      return v;
    },

    // editItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    // deleteItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialogDelete = true;
    // },

    // deleteItemConfirm() {
    //   this.desserts.splice(this.editedIndex, 1);
    //   this.closeDelete();
    // },

    // close() {
    //   this.dialog = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },

    // closeDelete() {
    //   this.dialogDelete = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
    //   } else {
    //     this.desserts.push(this.editedItem);
    //   }
    //   this.close();
    // },
  },
};
</script>
