import axios from 'axios';
import config from '../../../config';

class Client {
  constructor() {
    this.token = null;
  }

  request(url) {
    return axios({
      url,
      baseURL: 'https://app.asana.com/api/1.0/',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  init({token}) {
    this.token = token;
  }

  getWorkspace() {
    const url = `workspaces?opt_fields=id,name&limit=10`;
    return this.request(url)
      .then(function (response) {
        return Promise.resolve(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async getAllUsers(workspaceId = config.WORKSPACE_ID) {
    const url = `/workspaces/${workspaceId}/users`;
    const response = await this.request(url);

    const promises = response.data.data.map(user => this.request(`/users/${user.id}`));
    const results = await Promise.all(promises);
    return results.map(result => result.data.data);
  }

  async getProjects(workspaceId = config.WORKSPACE_ID) {
    const url = `workspaces/${workspaceId}/projects?archived=false`;
    const response = await this.request(url);
    return response.data.data;
  }

  getProjectDetails(projectId) {
    const url = `projects/${projectId}`;
    return this.request(url)
      .then(function (response) {
        return Promise.resolve(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getProjectTasks (projectId) {
    const url = `projects/${projectId}/tasks`;
    return this.request(url)
      .then(function (response) {
        return Promise.resolve(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getTaskDetails (taskId) {
    const url = `tasks/${taskId}`;
    return this.request(url)
      .then(function (response) {
        return Promise.resolve(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default new Client();