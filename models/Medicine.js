// Medicine class for storing and managing medicine details
class Medicine {
  constructor({
    id = null,
    name,
    category,
    expiryDate,
    quantity,
    donorId,
    imageUrl = null,
    status = 'pending',
    description = '',
    dosageForm = '',
    strength = ''
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.expiryDate = new Date(expiryDate);
    this.quantity = quantity;
    this.donorId = donorId;
    this.imageUrl = imageUrl;
    this.status = status; // pending, verified, rejected
    this.description = description;
    this.dosageForm = dosageForm;
    this.strength = strength;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  isExpired() {
    return new Date() > this.expiryDate;
  }

  daysUntilExpiry() {
    const today = new Date();
    const diffTime = this.expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  async save() {
    try {
      const token = localStorage.getItem('token');
      const method = this.id ? 'PUT' : 'POST';
      const url = this.id
        ? `http://localhost:8080/api/medicines/${this.id}`
        : 'http://localhost:8080/api/medicines';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(this.toJSON())
      });

      if (!response.ok) throw new Error('Failed to save medicine');
      const data = await response.json();
      Object.assign(this, data);
      return this;
    } catch (error) {
      console.error('Medicine save error:', error);
      throw error;
    }
  }

  async delete() {
    if (!this.id) throw new Error('Cannot delete unsaved medicine');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/medicines/${this.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete medicine');
      return true;
    } catch (error) {
      console.error('Medicine deletion error:', error);
      throw error;
    }
  }

  async processImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('medicineId', this.id);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/medicines/process-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to process medicine image');
      const data = await response.json();
      this.imageUrl = data.imageUrl;
      return data.analysis; // Returns AI analysis results
    } catch (error) {
      console.error('Image processing error:', error);
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      expiryDate: this.expiryDate.toISOString(),
      quantity: this.quantity,
      donorId: this.donorId,
      imageUrl: this.imageUrl,
      status: this.status,
      description: this.description,
      dosageForm: this.dosageForm,
      strength: this.strength,
      createdAt: this.createdAt.toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static async findById(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/medicines/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch medicine');
      const data = await response.json();
      return new Medicine(data);
    } catch (error) {
      console.error('Medicine fetch error:', error);
      throw error;
    }
  }

  static async findAll(filters = {}) {
    try {
      const token = localStorage.getItem('token');
      const queryString = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:8080/api/medicines?${queryString}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch medicines');
      const data = await response.json();
      return data.map(medicine => new Medicine(medicine));
    } catch (error) {
      console.error('Medicines fetch error:', error);
      throw error;
    }
  }
}

export default Medicine;