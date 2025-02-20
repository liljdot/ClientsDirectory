export const rejectJson = (response: Response): Promise<any> => {
    return response.json()
        .then((errData: {status: number, message: string, error: string}) => Promise.reject(errData))
}