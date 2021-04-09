import IconButton from "@material-ui/core/IconButton"
import Modal from "@material-ui/core/Modal"
import CloseIcon from "@material-ui/icons/Close"
import React from "react"
import styles from "./modal.module.css"
const contacts = Array.from({ length: 50 }, (_, i) => `room${i}`)

export const AddContactModal = ({ isOpen, onClose, onClick }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h6 className={styles.title}>Добавить участников</h6>
        <div className={styles.corner}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            className={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact}
              onClick={() => {
                onClick(contact)
              }}
            >
              {contact}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}
