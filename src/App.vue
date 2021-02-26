<template>
  <v-app color="dark">
    <v-card flat height="200px" tile>
      <v-toolbar dense color="blue">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <template>
      <v-card>
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
          :headers="headers"
          :items="customers"
          :search="search"
        ></v-data-table>
      </v-card> </template
  ></v-app>
</template>





    <!-- <template>
      <v-data-table
        :headers="headers"
        :items="customers"
        :items-per-page="15"
        class="elevation-1"
        :mask="['###.###.###-##', '##.###.###/####-##']"
      ></v-data-table> 
    </template> -->
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
          customerDoc = customer.ein;
          currentBalance = customer.current_balance;
          accountBalance = customer.account_balance;
        }

        if (customer.type == "individual") {
          customerName = `${customer.first_name} ${customer.last_name}`;
          customerDoc = customer.taxpayer_id;
          currentBalance = customer.current_balance;
          accountBalance = customer.account_balance;
        }

        const novoCustomer = {
          name: customerName,
          doc: customerDoc,
          current: currentBalance,
          account: accountBalance
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
    initialize() {
      // this.desserts = [
      //   {
      //     name: "Frozen Yogurt",
      //     // calories: 159,
      //     // fat: 6.0,
      //     // carbs: 24,
      //     // protein: 4.0,
      //   },
      //   {
      //     name: "Ice cream sandwich",
      //     // calories: 237,
      //     // fat: 9.0,
      //     // carbs: 37,
      //     // protein: 4.3,
      //   },
      //   {
      //     name: "Eclair",
      //     // calories: 262,
      //     // fat: 16.0,
      //     // carbs: 23,
      //     // protein: 6.0,
      //   }
      // ];
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
