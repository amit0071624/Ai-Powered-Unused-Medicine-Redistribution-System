// Base User class for handling authentication and user information
class User {
  constructor(email, password, role) {
    this.email = email;
    this.password = password; // Note: In production, password should be hashed
    this.role = role;
    this.profile = {
      fullName: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      allergies: ''
    };
  }

  async authenticate() {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      if (!response.ok) throw new Error('Authentication failed');
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  async updateProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) throw new Error('Failed to update profile');
      const data = await response.json();
      this.profile = { ...this.profile, ...data };
      return this.profile;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      this.profile = data;
      return this.profile;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  }
}

// Admin class for managing users and verifying medicines
class Admin extends User {
  constructor(email, password) {
    super(email, password, 'admin');
  }

  async verifyMedicine(medicineId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/medicines/${medicineId}/verify`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to verify medicine');
      return await response.json();
    } catch (error) {
      console.error('Medicine verification error:', error);
      throw error;
    }
  }

  async manageUser(userId, action, userData = {}) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: action === 'delete' ? 'DELETE' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: action === 'delete' ? null : JSON.stringify(userData)
      });

      if (!response.ok) throw new Error(`Failed to ${action} user`);
      return action === 'delete' ? true : await response.json();
    } catch (error) {
      console.error(`User management error (${action}):`, error);
      throw error;
    }
  }
}

// Donor class for medicine donations
class Donor extends User {
  constructor(email, password) {
    super(email, password, 'donor');
  }

  async donateMedicine(medicineData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/medicines/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(medicineData)
      });

      if (!response.ok) throw new Error('Failed to donate medicine');
      return await response.json();
    } catch (error) {
      console.error('Medicine donation error:', error);
      throw error;
    }
  }

  async trackDonations() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/medicines/donations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch donations');
      return await response.json();
    } catch (error) {
      console.error('Donation tracking error:', error);
      throw error;
    }
  }
}

// Receiver class for requesting medicines
class Receiver extends User {
  constructor(email, password) {
    super(email, password, 'receiver');
  }

  async requestMedicine(medicineId, quantity) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/medicines/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ medicineId, quantity })
      });

      if (!response.ok) throw new Error('Failed to request medicine');
      return await response.json();
    } catch (error) {
      console.error('Medicine request error:', error);
      throw error;
    }
  }

  async viewAvailableMedicines() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/medicines/available', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch available medicines');
      return await response.json();
    } catch (error) {
      console.error('Available medicines fetch error:', error);
      throw error;
    }
  }
}

export { User, Admin, Donor, Receiver };