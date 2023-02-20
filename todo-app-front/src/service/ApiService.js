import http from "../httpAPICommon";

class ApiService {
  getAll() {
    return http.get("/students");
  }

  get(id) {
    return http.get(`/students/${id}`);
  }

  create(data) {
    return http.post("/students", data);
  }

  update(id, data) {
    return http.put(`/students/${id}`, data);
  }

  delete(id) {
    return http.delete(`/students/${id}`);
  }

  deleteAll() {
    return http.delete(`/students`);
  }

  findByName(name) {
    return http.get(`/students/findbyname/${name}`);
  }
  findByClass(classe) {
    return http.get(`/students/findbyclasse/${classe}`);
  }
}

export default new ApiService();