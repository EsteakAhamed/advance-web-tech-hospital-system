import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  department: string;
}

export interface Patient {
  id: number;
  name: string;
  condition: string;
}

@Injectable()
export class DoctorService {
   private doctors: Doctor[] = [];
  private idCounter = 1;

  // 1. Get all doctors
   getAllDoctors(): Doctor[] {
    return this.doctors;
  }

  // 2. Get doctor by ID
  getDoctorById(id: string) {
    return this.doctors.find(doctor => doctor.id === parseInt(id));
  }

  // 3. Create new doctor
  createDoctor(createDoctorDto: CreateDoctorDto) {

    console.log('Received data:', createDoctorDto); 
  console.log('Name:', createDoctorDto.name);

    const newDoctor: Doctor = {
      id: this.idCounter++,
      ...createDoctorDto,
    };

    console.log('New doctor:', newDoctor);
    this.doctors.push(newDoctor);
    return `Doctor created: ${newDoctor.name}`;
  }

  // 4. Update entire doctor (PUT)
  updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctorIndex = this.doctors.findIndex(doctor => doctor.id === parseInt(id));
    if (doctorIndex !== -1) {
      this.doctors[doctorIndex] = { ...this.doctors[doctorIndex], ...updateDoctorDto };
      return `Doctor updated: ${this.doctors[doctorIndex].name}`;
    }
    return 'Doctor not found';
  }

  // 5. Update partial doctor (PATCH)
  patchDoctor(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctorIndex = this.doctors.findIndex(doctor => doctor.id === parseInt(id));
    if (doctorIndex !== -1) {
      this.doctors[doctorIndex] = { ...this.doctors[doctorIndex], ...updateDoctorDto };
      return `Doctor patched: ${this.doctors[doctorIndex].name}`;
    }
    return 'Doctor not found';
  }

  // 6. Delete doctor
  deleteDoctor(id: string) {
    const doctorIndex = this.doctors.findIndex(doctor => doctor.id === parseInt(id));
    if (doctorIndex !== -1) {
      const deletedDoctor = this.doctors.splice(doctorIndex, 1)[0];
      return `Doctor deleted: ${deletedDoctor.name}`;
    }
    return 'Doctor not found';
  }

  // 7. Search doctors
  searchDoctors(query: string): Doctor[] {
  console.log('🔍 === SEARCH DEBUG START ===');
  console.log('Search query received:', query);
  console.log('Number of doctors in array:', this.doctors.length);
  console.log('All doctors:', JSON.stringify(this.doctors, null, 2));
  
  if (!query || query.trim() === '') {
    console.log('Empty query - returning all doctors');
    return this.doctors;
  }
  
  const searchTerm = query.toLowerCase().trim();
  console.log('Search term (lowercase):', searchTerm);
  
  const results = this.doctors.filter(doctor => {
    const doctorNameLower = doctor.name.toLowerCase();
    const doctorSpecLower = doctor.specialization.toLowerCase();
    
    const nameMatch = doctorNameLower.includes(searchTerm);
    const specMatch = doctorSpecLower.includes(searchTerm);
    
    console.log(`Checking doctor: "${doctor.name}"`);
    console.log(`  Name lower: "${doctorNameLower}"`);
    console.log(`  Spec lower: "${doctorSpecLower}"`);
    console.log(`  Name match: ${nameMatch}, Spec match: ${specMatch}`);
    console.log(`  Combined match: ${nameMatch || specMatch}`);
    
    return nameMatch || specMatch;
  });
  
  console.log('Search results found:', results.length);
  console.log('Results:', JSON.stringify(results, null, 2));
  console.log('🔍 === SEARCH DEBUG END ===');
  
  return results;
}

  // 8. Get doctor's patients
  getDoctorPatients(id: string) {
    // Mock data - as shown in lectures
    return [
      { id: 1, name: 'Patient A', condition: 'Fever' },
      { id: 2, name: 'Patient B', condition: 'Checkup' }
    ];
  }
}