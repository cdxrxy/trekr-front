// employees list selector
export const selectEmployees = (state) => state.employees

export const selectAllEmployees = (state) => state?.employees?.list
export const selectEmployeesLoading = (state) => state.employees.isLoading

export const selectEmployeesById = (state, employeeIds) =>
  state.employees?.list?.map((employee) => employeeIds.includes(employee._id))

export const selectEmployeesForMultiselect = (state) =>
  state.employees?.list?.map((employee) => ({ label: employee.fullname, value: employee._id }))
