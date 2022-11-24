// vehicles list selector
export const selectVehicles = (state) => state.vehicles

export const selectAllVehicles = (state) => state.vehicles.list
export const selectVehiclesLoading = (state) => state.vehicles.isLoading

export const selectVehiclesByNumber = (state) =>
  state.vehicles?.list?.map((vehicle) => vehicle.number)

export const selectVehiclesForMultiselect = (state) =>
  state.vehicles?.list?.map((vehicle) => ({ label: vehicle.number, value: vehicle._id }))
