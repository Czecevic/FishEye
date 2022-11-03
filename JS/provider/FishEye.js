
// récupère les informations sur les informations sur les photographe
export default class FishEye {
    async getDataFishEye() {
        let url = 'Photographer/photographers.json'
        let response = await fetch(url)
        let data = await response.json()

        const dataPhotographers = [...data.photographers];
        const dataMedias = [...data.media];

        return {
            'photographers': dataPhotographers,
            'media': dataMedias
        };
    }
}