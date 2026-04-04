import mongoose from 'mongoose';

const computeObsFromSalaire = (salaire) => {
  if (salaire >= 0 && salaire < 1000) return 'mediocre';
  else if (salaire >= 1000 && salaire <= 5000) return 'moyen';
  else if (salaire > 5000)return 'grand';
  else return 'erreur de valeur';
};

const employeeSchema = new mongoose.Schema(
  {
    numEmp: {
      type: Number,
      required: true,
      unique: true,
    },
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    salaire: {
      type: Number,
      required: true,
    },
    obs: {
      type: String,
      enum: ['mediocre', 'moyen', 'grand', 'erreur de valeur'],
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.pre('save', function preSave(next) {
  this.obs = computeObsFromSalaire(this.salaire);
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
