class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // OK - TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        //this.engine.addChoice("Test1");
    }

    handleChoice() {
        this.engine.gotoScene(Location, "Bed"); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices

                //Added code for checking if the choice has met its condition if it has one
                if (!choice.Condition || this.engine.state[choice.Condition]) {
                    this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                }
                
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice.Target == "Coin Flip") {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(SpecialLocation, choice.Target);
        }
        else if(choice.Target == "The Room 2") {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);

            this.engine.state.canGoToLunch = true;
        }
        else if (choice.Target != null) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
        else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

class SpecialLocation extends Location {
    create(key) {
        let locationData = this.engine.storyData.SpecialLocations[key];

        //Coin flip code
        let rand = Math.random();
        if (rand <= 0.75) {
            this.engine.show("Your room mate flips the coin. It spins in the air for a while before he catches it and reveals it. You lost the coin flip.");
            this.engine.show("*S M A C K !*");
            this.engine.show("A sharp pain rings across your face. You can feel your face swelling up as your ears ring. He chuckles.");
            this.engine.show("'You up for more?' he asks.");
        }
        else {
            this.engine.show("Your room mate flips the coin. It spins in the air for a while before he catches it and reveals it.");
            this.engine.show("You win the coin flip! Your room mate looks at the coin in disappointment. He still has a smirk on his face.");
            this.engine.show("He brings out his ID and hands it to you. 'It was fun while it lasted,' he says.");
            this.engine.show("*S M A C K !*");
            this.engine.show("You give him a slap across the face, exactly like the slaps he delivered to you.");
            this.engine.show("You turn around and start heading for the exit of the library. Your room mate looks dumbfounded.");
            
            this.engine.state.coinFlipWon = true;
            this.engine.state.hasKey = true;
        }

        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices

                //Added code for checking if the choice has met its condition if it has one
                if (!choice.Condition || this.engine.state[choice.Condition]) {
                    this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                }
                
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        }

        

        
    }

    handleChoice(choice) {
        if(choice.Target == "Coin Flip") {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(SpecialLocation, choice.Target);
        }
        else if (choice.Target != null) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
        else {
            this.engine.gotoScene(End);
        }
    }
}

Engine.load(Start, 'myStory.json');