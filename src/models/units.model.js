const unitSchemma = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    unitCode: {
        type: String,
        required: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true
    },
}
  