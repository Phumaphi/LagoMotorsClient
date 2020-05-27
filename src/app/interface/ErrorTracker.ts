export class ErrorTracker {
    errorNumber: number;
    message: string;
    friendlyMessage: string;
     statusMessage = `${this.message}, ${this.friendlyMessage}` ;
}
