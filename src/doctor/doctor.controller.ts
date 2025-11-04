import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { DoctorService, Doctor } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';





@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  getDoctors(): Doctor[] {
    return this.doctorService.getAllDoctors();
  }


  @Get('search')
  searchDoctors(@Query('q') query: string): Doctor[] {
    return this.doctorService.searchDoctors(query);
  }

  
  @Get(':id')
  getDoctorById(@Param('id') id: string): Doctor | undefined {
    return this.doctorService.getDoctorById(id);
  }

  @Post()
  createDoctor(@Body() createDoctorDto: CreateDoctorDto): string {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @Put(':id')
  updateDoctor(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto): string {
    return this.doctorService.updateDoctor(id, updateDoctorDto);
  }

  @Patch(':id')
  patchDoctor(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto): string {
    return this.doctorService.patchDoctor(id, updateDoctorDto);
  }

  @Delete(':id')
  deleteDoctor(@Param('id') id: string): string {
    return this.doctorService.deleteDoctor(id);
  }

  

  @Get(':id/patients')
  getDoctorPatients(@Param('id') id: string) {
    return this.doctorService.getDoctorPatients(id);
  }
}  