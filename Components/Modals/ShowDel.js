import { Alert } from 'react-native';

export function showDeleteConfirmationAlert(title, onConfirm,id) {
    Alert.alert(
        'Confirm Deletion', // Title of the alert
        `Are you sure you want to delete ${title}?`, // Message
        [
            {
                text: 'No', // Option 1: No (does nothing)
                onPress: () => console.log('Deletion canceled'),
                style: 'cancel',
            },
            {
                text: 'Yes', // Option 2: Yes (executes the onConfirm function)
                onPress:()=> onConfirm(id),
                style: 'destructive',
            },
        ],
        { cancelable: false } // Ensures the alert must be dismissed with an action
    );
}
