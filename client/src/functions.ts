export const rejectJson = (response: Response): Promise<any> => {
    return response.json()
        .then((errData: any) => Promise.reject(errData))
}