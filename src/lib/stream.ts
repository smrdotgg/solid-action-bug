"use server";

export const returnCountStream = async (max:number) =>
  new ReadableStream<string>({
    start(controller) {
      let current = 1;
      
      const intervalId = setInterval(() => {
        if (current <= max) {
          controller.enqueue(current.toString());
          current++;
        } else {
          clearInterval(intervalId);
          controller.close();
        }
      }, 1000);
    },
    cancel() {
      // Optional: add cleanup logic if stream is cancelled
    }
  });
