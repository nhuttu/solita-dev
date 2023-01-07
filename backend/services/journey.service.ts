import { AppDataSource } from "../database";
import { JourneyEntity } from "../entities/journey.entity";

// MISC: I like class based services so I can share the repository across the functions..
export class JourneyService {
  private journeyRepository = AppDataSource.getRepository(JourneyEntity);

  public async createJourney() {
    // TODO: Implement create
    console.log("Journey create");
  }

  public async updateJourney() {
    // TODO: Implement update
    console.log("Journey update");
  }

  public async deleteJourney() {
    // TODO: Implement delete
    console.log("Journey delete");
  }

  public async findJourney(id: number): Promise<JourneyEntity | null> {
    const journeyEntity = await this.journeyRepository.findOne({
      where: { id: id },
    });

    return journeyEntity;
  }

  public async findJourneys(page?: number) {
    // TODO: Implement multi-find
    const PAGE_AMOUNT = 50;
    if (page) {
      // TODO: Query the database between page * PAGE_AMOUNT to page * PAGE_AMOUNT + PAGE_AMOUNT for frontend "infinite" query
    }
    // NOTE: if page is not present, perhaps return the first 50 only.
    console.log("Journeys find");
  }
}
