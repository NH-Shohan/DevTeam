import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDTO } from './project.dto';
import { ProjectEntity } from './project.entity';
import { UpdateProjectLinkDTO } from './update-project-link.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  //   Add Project
  async addProject(projectInfo: ProjectEntity): Promise<ProjectEntity> {
    try {
      return this.projectRepository.save(projectInfo);
    } catch (error) {
      throw new Error('Error adding project');
    }
  }

  //   Get All Projects
  async getAllProjects(): Promise<ProjectEntity[]> {
    try {
      return this.projectRepository.find();
    } catch (error) {
      throw new Error('Error getting all projects');
    }
  }

  //   Get Project By ID
  async getProjectById(id: number): Promise<ProjectEntity> {
    try {
      const project = await this.projectRepository.findOneBy({
        id: id,
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return project;
    } catch (error) {
      throw new Error('Error getting project by ID');
    }
  }

  //   Update Projects
  async updateProject(
    projectId: number,
    projectInfo: ProjectDTO,
  ): Promise<ProjectEntity> {
    try {
      await this.projectRepository.update(projectId, projectInfo);
      const updatedProject = await this.projectRepository.findOneBy({
        id: projectId,
      });
      if (!updatedProject) {
        throw new NotFoundException('Project not found after update');
      }
      return updatedProject;
    } catch (error) {
      throw new Error('Error updating project');
    }
  }

  //   Update project link
  async updateProjectLink(
    projectId: number,
    updateProjectLinkDTO: UpdateProjectLinkDTO,
  ): Promise<ProjectEntity> {
    try {
      await this.projectRepository.update(projectId, {
        projectLink: updateProjectLinkDTO.newProjectLink,
      });
      const updatedProject = await this.projectRepository.findOneBy({
        id: projectId,
      });
      if (!updatedProject) {
        throw new NotFoundException('Project not found after update');
      }
      return updatedProject;
    } catch (error) {
      throw new Error('Error updating project link');
    }
  }

  //   Delete Project
  async deleteProject(projectId: number): Promise<void> {
    try {
      const result = await this.projectRepository.delete(projectId);
      if (result.affected === 0) {
        throw new NotFoundException('Project not found for deletion');
      }
    } catch (error) {
      throw new Error('Error deleting project');
    }
  }
}
