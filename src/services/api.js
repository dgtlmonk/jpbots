// STUB BACK-END SERVICE METHODS

// mmock data
import RobotsList from 'data'

// mock data retrieval
const retrieveRobots = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(RobotsList), 1500)
  });
}

export default {
  getList: async () => retrieveRobots()
}
